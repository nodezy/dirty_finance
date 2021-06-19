// SPDX-License-Identifier: MIT

// Dirty.Finance Staking Contract Version 1.0
// Stake your $dirty or LP tokens to receive Dirtycash rewards (XXXCASH)

pragma solidity 0.7.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./dirtycash.sol";

interface IDirtyNFT {
  function mint(address to, uint256 id) external;
}

contract Authorizable is Ownable {

    mapping(address => bool) public authorized;

    modifier onlyAuthorized() {
        require(authorized[_msgSender()] || owner() == address(_msgSender()));
        _;
    }

    function addAuthorized(address _toAdd) onlyOwner public {
        require(_toAdd != address(0));
        authorized[_toAdd] = true;
    }

    function removeAuthorized(address _toRemove) onlyOwner public {
        require(_toRemove != address(0));
        require(_toRemove != address(_msgSender()));
        authorized[_toRemove] = false;
    }

}

contract DirtyFarm is Ownable, Authorizable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of DIRTYCASH tokens
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accDirtyPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accDirtyPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken; // Address of LP token contract.
        uint256 allocPoint; // How many allocation points assigned to this pool. DIRTYCASH tokens to distribute per block.
        uint256 lastRewardBlock; // Last block number that DIRTYCASH tokens distribution occurs.
        uint256 accDirtyPerShare; // Accumulated DIRTYCASH tokens per share, times 1e12. See below.
        uint256 runningTotal; // Total accumulation of tokens (not including reflection, pertains to pool 1 ($Dirty))
    }

    struct CreatorInfo {
        address creatorAddress; //wallet address of the NFT creator/infuencer
        uint256 nftID; //id of the NFT
        uint256 creatorSplit; //percent to split proceeds with creator/pool;
        bool exists;
    }

    DirtyCash public immutable dirty; // The DIRTYCASH ERC-20 Token.
    uint256 private dirtyPerBlock; // DIRTYCASH tokens distributed per block. Use getDirtyPerBlock() to get the updated reward.

    PoolInfo[] public poolInfo; // Info of each pool.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo; // Info of each user that stakes LP tokens.
    mapping(uint256 => CreatorInfo) public creatorInfo; // Info of each NFT artist/infuencer wallet.
    uint256 public totalAllocPoint; // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public startBlock; // The block number when DIRTYCASH token mining starts.

    uint256 public blockRewardUpdateCycle = 1 days; // The cycle in which the dirtyPerBlock gets updated.
    uint256 public blockRewardLastUpdateTime = block.timestamp; // The timestamp when the block dirtyPerBlock was last updated.
    uint256 public blocksPerDay = 5000; // The estimated number of mined blocks per day, lowered so rewards are halved to start.
    uint256 public blockRewardPercentage = 1; // The percentage used for dirtyPerBlock calculation.
    uint256 public unstakeTime = 60; // Time in seconds to wait for withdrawal.
    uint256 public poolReward = 10000000000000000000000; //starting basis for poolReward (default 10k).
    uint256 public conversionRate = 1000000; //conversion rate of dirtycash => $dirty (default 1M).
    bool public enableRewardWithdraw = false;

    mapping(address => bool) public addedLpTokens; // Used for preventing LP tokens from being added twice in add().
    mapping(uint256 => mapping(address => uint256)) public unstakeTimer; // Used to track time since unstake requested.
    mapping(address => uint256) private userBalance; //balance of DirtyCash for each user that survives staking/unstaking/redeeming.
    mapping(uint256 => uint256) public redeemCost; // cost of the NFT

    address public NFTAddress; //NFT contract address

    event Unstake(address indexed user, uint256 indexed pid);
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event WithdrawRewardsOnly(address indexed user, uint256 amount);

    constructor(
        DirtyCash _dirty,
        uint256 _startBlock
    ) {
        require(address(_dirty) != address(0), "DIRTYCASH address is invalid");
        require(_startBlock >= block.number, "startBlock is before current block");

        dirty = _dirty;
        startBlock = _startBlock;
    }

    modifier updateDirtyPerBlock() {
        (uint256 blockReward, bool update) = getDirtyPerBlock();
        if (update) {
            dirtyPerBlock = blockReward;
            blockRewardLastUpdateTime = block.timestamp;
        }
        _;
    }

    function getDirtyPerBlock() public view returns (uint256, bool) {
        if (block.number < startBlock) {
            return (0, false);
        }

        if (block.timestamp >= getDirtyPerBlockUpdateTime() || dirtyPerBlock == 0) {
            return (poolReward.mul(blockRewardPercentage).div(100).div(blocksPerDay), true);
        }

        return (dirtyPerBlock, false);
    }

    function getDirtyPerBlockUpdateTime() public view returns (uint256) {
        // if blockRewardUpdateCycle = 1 day then roundedUpdateTime = today's UTC midnight
        uint256 roundedUpdateTime = blockRewardLastUpdateTime - (blockRewardLastUpdateTime % blockRewardUpdateCycle);
        // if blockRewardUpdateCycle = 1 day then calculateRewardTime = tomorrow's UTC midnight
        uint256 calculateRewardTime = roundedUpdateTime + blockRewardUpdateCycle;
        return calculateRewardTime;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(
        uint256 _allocPoint,
        IERC20 _lpToken,
        bool _withUpdate
    ) public onlyOwner {
        require(address(_lpToken) != address(0), "LP token is invalid");
        require(!addedLpTokens[address(_lpToken)], "LP token is already added");

        require(_allocPoint >= 1 && _allocPoint <= 100, "_allocPoint is outside of range 1-100");

        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            lpToken : _lpToken,
            allocPoint : _allocPoint,
            lastRewardBlock : lastRewardBlock,
            accDirtyPerShare : 0,
            runningTotal : 0 
        }));

        addedLpTokens[address(_lpToken)] = true;
    }

    // Update the given pool's DIRTYCASH token allocation point. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) public onlyAuthorized {
        require(_allocPoint >= 1 && _allocPoint <= 100, "_allocPoint is outside of range 1-100");

        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // View function to see pending DIRTYCASH tokens on frontend.
    function pendingRewards(uint256 _pid, address _user) public view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accDirtyPerShare = pool.accDirtyPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = block.number.sub(pool.lastRewardBlock);
            (uint256 blockReward, ) = getDirtyPerBlock();
            uint256 dirtyReward = multiplier.mul(blockReward).mul(pool.allocPoint).div(totalAllocPoint);
            accDirtyPerShare = accDirtyPerShare.add(dirtyReward.mul(1e12).div(lpSupply));
        }
        return user.amount.mul(accDirtyPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public onlyAuthorized {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date when lpSupply changes
    // For every deposit/withdraw pool recalculates accumulated token value
    function updatePool(uint256 _pid) public updateDirtyPerBlock {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }

        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = block.number.sub(pool.lastRewardBlock);
        uint256 dirtyReward = multiplier.mul(dirtyPerBlock).mul(pool.allocPoint).div(totalAllocPoint);

        // no minting is required, the contract should have DIRTYCASH token balance pre-allocated
        // accumulated DIRTYCASH per share is stored multiplied by 10^12 to allow small 'fractional' values
        pool.accDirtyPerShare = pool.accDirtyPerShare.add(dirtyReward.mul(1e12).div(lpSupply));
        pool.lastRewardBlock = block.number;
    }

    function updatePoolReward(uint256 _amount) public onlyAuthorized {
        poolReward = _amount;
    }

    // Deposit LP tokens/$Dirty to DirtyFarming for DIRTYCASH token allocation.
    function deposit(uint256 _pid, uint256 _amount) public nonReentrant {

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_msgSender()];

        updatePool(_pid);

        if (_amount > 0) {

            if(user.amount > 0) { //if user has already deposited, secure rewards before reconfiguring rewardDebt
                uint256 tempRewards = pendingRewards(_pid, _msgSender());
                userBalance[_msgSender()] = userBalance[_msgSender()].add(tempRewards);
            }
            
            if (_pid == 1) { //$Dirty tokens
                require(_amount >= 21000000000000000000000000, "You cannot stake less than 21 Million $Dirty");
                require(_amount.add(user.amount) <= 2100000000000000000000000000, "You cannot stake more than 2.1 Billion $Dirty");
                pool.runningTotal = pool.runningTotal.add(_amount);
                user.amount = user.amount.add(_amount);  
                pool.lpToken.safeTransferFrom(address(_msgSender()), address(this), _amount);
                //function to update all totals here

                
            } else { //LP tokens
                require(_amount >= 1000000000000000000000, "You cannot stake less than 1k LP Tokens");
                require(_amount.add(user.amount) <= 10000000000000000000000, "You cannot stake more than 10k LP Tokens");
                pool.runningTotal = pool.runningTotal.add(_amount);
                user.amount = user.amount.add(_amount);
                pool.lpToken.safeTransferFrom(address(_msgSender()), address(this), _amount);
            }
            
        }
        unstakeTimer[_pid][_msgSender()] = 9999999999;
        
        user.rewardDebt = user.amount.mul(pool.accDirtyPerShare).div(1e12);
        emit Deposit(_msgSender(), _pid, _amount);
    }

    function setUnstakeTime(uint256 _time) external onlyOwner {

        require(_time >= 0 || _time <= 172800, "Time should be between 0 and 2 days (in seconds)");
        unstakeTime = _time;
    }

    //Call unstake to start countdown
    function unstake(uint256 _pid) public {
        UserInfo storage user = userInfo[_pid][_msgSender()];
        require(user.amount > 0, "You have no amount to unstake");

        unstakeTimer[_pid][_msgSender()] = block.timestamp.add(unstakeTime);

    }

    //Get time remaining until able to withdraw tokens
    function timeToUnstake(uint256 _pid, address _user) external view returns (uint256)  {

        if (unstakeTimer[_pid][_user] > block.timestamp) {
            return unstakeTimer[_pid][_user].sub(block.timestamp);
        } else {
            return 0;
        }
    }


    // Withdraw LP tokens from DirtyFarming
    function withdraw(uint256 _pid, uint256 _amount) public nonReentrant {

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_msgSender()];
        uint256 userAmount = user.amount;
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(user.amount >= _amount, "Withdraw amount is greater than user amount");
        require(block.timestamp > unstakeTimer[_pid][_msgSender()], "Unstaking wait period has not expired");

        updatePool(_pid);

        if (_amount > 0) {

            if (_pid == 1) { //$Dirty tokens
                
                uint256 lpSupply = pool.lpToken.balanceOf(address(this)); //get total amount of tokens
                uint256 totalRewards = lpSupply.sub(pool.runningTotal); //get difference between contract address amount and ledger amount
                if (totalRewards == 0) { //no rewards, just return 100% to the user

                    uint256 tempRewards = pendingRewards(_pid, _msgSender());
                    userBalance[_msgSender()] = userBalance[_msgSender()].add(tempRewards);

                    pool.runningTotal = pool.runningTotal.sub(_amount);
                    pool.lpToken.safeTransfer(address(_msgSender()), _amount);
                    user.amount = user.amount.sub(_amount);
                    emit Withdraw(_msgSender(), _pid, _amount);
                    
                } 
                if (totalRewards > 0) { //include reflection

                    uint256 tempRewards = pendingRewards(_pid, _msgSender());
                    userBalance[_msgSender()] = userBalance[_msgSender()].add(tempRewards);

                    uint256 percentRewards = _amount.mul(100).div(pool.runningTotal); //get % of share out of 100
                    uint256 reflectAmount = percentRewards.mul(totalRewards).div(100); //get % of reflect amount

                    pool.runningTotal = pool.runningTotal.sub(_amount);
                    user.amount = user.amount.sub(_amount);
                    _amount = _amount.mul(99).div(100).add(reflectAmount);
                    pool.lpToken.safeTransfer(address(_msgSender()), _amount);
                    emit Withdraw(_msgSender(), _pid, _amount);
                }               

            } else {


                uint256 tempRewards = pendingRewards(_pid, _msgSender());
                
                userBalance[_msgSender()] = userBalance[_msgSender()].add(tempRewards);
                user.amount = user.amount.sub(_amount);
                pool.runningTotal = pool.runningTotal.sub(_amount);
                pool.lpToken.safeTransfer(address(_msgSender()), _amount);
                emit Withdraw(_msgSender(), _pid, _amount);
            }
            
        }

        if (userAmount == _amount) { //user is retrieving entire balance, set rewardDebt to zero
            user.rewardDebt = 0;
        } else {
            user.rewardDebt = user.amount.mul(pool.accDirtyPerShare).div(1e12); 
        }
                        
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_msgSender()];

        uint256 _amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;

        pool.lpToken.safeTransfer(address(_msgSender()), _amount);
        emit EmergencyWithdraw(_msgSender(), _pid, _amount);

        
    }

    // Safe DIRTYCASH token transfer function, just in case if
    // rounding error causes pool to not have enough DIRTYCASH tokens
    function safeTokenTransfer(address _to, uint256 _amount) internal {
        uint256 balance = dirty.balanceOf(address(this));
        uint256 amount = _amount > balance ? balance : _amount;
        dirty.transfer(_to, amount);
    }

    function setBlockRewardUpdateCycle(uint256 _blockRewardUpdateCycle) external onlyAuthorized {
        require(_blockRewardUpdateCycle > 0, "Value is zero");
        blockRewardUpdateCycle = _blockRewardUpdateCycle;
    }

    // Just in case an adjustment is needed since mined blocks per day
    // changes constantly depending on the network
    function setBlocksPerDay(uint256 _blocksPerDay) external onlyAuthorized {
        require(_blocksPerDay >= 1 && _blocksPerDay <= 14000, "Value is outside of range 1-14000");
        blocksPerDay = _blocksPerDay;
    }

    function setBlockRewardPercentage(uint256 _blockRewardPercentage) external onlyAuthorized {
        require(_blockRewardPercentage >= 1 && _blockRewardPercentage <= 5, "Value is outside of range 1-5");
        blockRewardPercentage = _blockRewardPercentage;
    }

    // This will allow to rescue ETH sent by mistake directly to the contract
    function rescueETHFromContract() external onlyAuthorized {
        address payable _owner = payable(_msgSender());
        _owner.transfer(address(this).balance);
    }

    // Function to allow admin to claim *other* ERC20 tokens sent to this contract (by mistake)
    function transferERC20Tokens(address _tokenAddr, address _to, uint _amount) public onlyAuthorized {
       /* require(_tokenAddr != address(this), "Cannot transfer out native token");
        require(_tokenAddr != address(0x63B75801aa9776A0340f65af6654eC53167f0778), "Cannot transfer out LP token");
        require(_tokenAddr != address(0x62EcF49636F282313cda51E2e3cbF0E258e65356), "Cannot transfer out $Dirty token");*/
        IERC20(_tokenAddr).transfer(_to, _amount);
    }

    //returns total stake amount (LP, Dirty token) and address of that token respectively
    function getTotalStake(uint256 _pid, address _user) external view returns (uint256, IERC20) { 
         PoolInfo storage pool = poolInfo[_pid];
         UserInfo storage user = userInfo[_pid][_user];

        return (user.amount, pool.lpToken);
    }

    //gets the full ledger of deposits into each pool
    function getRunningDepositTotal(uint256 _pid) external view returns (uint256) { 
         PoolInfo storage pool = poolInfo[_pid];

        return (pool.runningTotal);
    }

    //gets the total of all pending rewards from each pool
    function getTotalPendingRewards(address _user) public view returns (uint256) { 
        uint256 value1 = pendingRewards(0, _user);
        uint256 value2 = pendingRewards(1, _user);

        return value1.add(value2);
    }

    //gets the total amount of rewards secured (not pending)
    function getAccruedRewards(address _user) external view returns (uint256) { 
        return userBalance[_user];
    }

    //gets the total of pending + secured rewards
    function getTotalRewards(address _user) external view returns (uint256) { 
        uint256 value1 = getTotalPendingRewards(_user);
        uint256 value2 = userBalance[_user];

        return value1.add(value2);
    }

    //moves all pending rewards into the accrued array
    function redeemTotalRewards(address _user) internal { 

        uint256 pool0 = 0;

        PoolInfo storage pool = poolInfo[pool0];
        UserInfo storage user = userInfo[pool0][_user];

        updatePool(pool0);
        
        uint256 value0 = pendingRewards(pool0, _user);
        
        userBalance[_user] = userBalance[_user].add(value0);

        user.rewardDebt = user.amount.mul(pool.accDirtyPerShare).div(1e12); 

        uint256 pool1 = 1; 
        
        pool = poolInfo[pool1];
        user = userInfo[pool1][_user];

        updatePool(pool1);

        uint256 value1 = pendingRewards(pool1, _user);
        
        userBalance[_user] = userBalance[_user].add(value1);

        user.rewardDebt = user.amount.mul(pool.accDirtyPerShare).div(1e12); 
    }

    //whether to allow the DirtyCash token to actually be withdrawn, of just leave it virtual (default)
    function enableRewardWithdrawals(bool _status) external onlyAuthorized {
        enableRewardWithdraw = _status;
    }

    //withdraw 
    function withdrawRewardsOnly() public nonReentrant {

        require(enableRewardWithdraw, "DirtyCash withdrawals are not enabled");

        IERC20 rewardtoken = IERC20(0xB02658F05315A7bE78486A53ca618c1bBBFeC61a); //dirtycash

        redeemTotalRewards(_msgSender());

        uint256 pending = userBalance[_msgSender()];
        if (pending > 0) {
            require(rewardtoken.balanceOf(address(this)) > pending, "$DIRTYCASH token balance of this contract is insufficient");
            userBalance[_msgSender()] = 0;
            safeTokenTransfer(_msgSender(), pending);
        }
        
        emit WithdrawRewardsOnly(_msgSender(), pending);
    }

     function setNFTAddress(address _address) public onlyAuthorized {
        NFTAddress = _address;
    }

    function setRedeemCost(uint256 _id, uint256 _cost) public onlyAuthorized {
        redeemCost[_id] = _cost;
    }

    function getRedeemCost(uint256 _id) external view returns (uint256) {
        return redeemCost[_id];
    }

    //redeem the NFT with dirtycash only
    function redeem(uint256 _id) public nonReentrant {
        uint256 price = redeemCost[_id];
        require(price > 0, "NFT not found");
        if (userBalance[_msgSender()] < price) {
            redeemTotalRewards(_msgSender());
        }
        require(userBalance[_msgSender()] >= price, "Not enough DirtyCash to redeem");
        IDirtyNFT(NFTAddress).mint(_msgSender(), _id);
        userBalance[_msgSender()] = userBalance[_msgSender()].sub(price);
    }

    //set the conversion rate between dirtycash and the $dirty token
    function setConverstionRate(uint256 _rate) public onlyAuthorized {
        conversionRate = _rate;
    }

    // users can also purchase the NFT with $dirty token and the proceeds can be split between the NFT influencer/artist and the staking pool
    function purchase(uint256 _id) public nonReentrant {
        
        CreatorInfo storage creator = creatorInfo[_id];

        uint256 price = redeemCost[_id];
        price = price.mul(conversionRate);
        IERC20 token = IERC20(0x62EcF49636F282313cda51E2e3cbF0E258e65356); //dirty token

        require(token.balanceOf(_msgSender()) >= price, "You do not have the required tokens for purchase"); 
        IDirtyNFT(NFTAddress).mint(_msgSender(), _id);

        if (creator.exists) { //re-arrange so no taxes are incurred
            uint256 creatorShare;
            uint256 poolShare;
            creatorShare = price.mul(creator.creatorSplit).div(100);
            poolShare = price.sub(creatorShare);
            if (creatorShare > 0) {
                IERC20(token).transferFrom(_msgSender(), address(creator.creatorAddress), creatorShare);
            }
            if (poolShare > 0) {
                IERC20(token).transferFrom(_msgSender(), address(this), poolShare);
            }
            
        } else {
            IERC20(token).transferFrom(_msgSender(), address(this), price);
        }

        
    }

    //here is where we populate the NFT infuencer/artist info so they can receive proceeds from purchases with $dirty token
    //and split that with the staking pool based on a split % for each NFT (can be all the same by invoking ALL or can be 
    //different base on each NFT [ALL invocation assumes 6 NFTs in the collection])
    function setCreatorInfo(address _creator, uint256 _nftid, uint256 _splitPercent, bool _all) public onlyAuthorized {

        require(_splitPercent >= 0 && _splitPercent <= 100, "Split is not in the correct format");

        if (_all == true) {
            for (uint256 x = _nftid; x < _nftid.add(6); ++x) {
            
            CreatorInfo storage creator = creatorInfo[x];
            
            creator.creatorAddress = _creator;
            creator.nftID = x;
            creator.creatorSplit = _splitPercent;
            creator.exists = true;
            }

        } else {

            CreatorInfo storage creator = creatorInfo[_nftid];

            if (_creator == address(0)) {
                creator.creatorAddress = _creator;
                creator.nftID = _nftid;
                creator.creatorSplit = 0;
                creator.exists = false;

            } else {

                creator.creatorAddress = _creator;
                creator.nftID = _nftid;
                creator.creatorSplit = _splitPercent;
                creator.exists = true;
            }       

        }
    }

    function getCreatorInfo(uint256 _nftid) external view returns (address,uint256,uint256,bool) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return (creator.creatorAddress,creator.nftID,creator.creatorSplit,creator.exists);
    }

    //we can give the artists/influencers a DirtyCash balance so they can redeem their own NFTs
    function setCreatorDirtyCashBalance(address _creator, uint256 _amount) public onlyAuthorized {
        userBalance[_creator] = _amount;
    }

    function getConversionRate() external view returns (uint256) {
        return conversionRate;
    }

    function getConversionPrice(uint256 _price) external view returns (uint256) {
        uint256 newprice = _price.mul(conversionRate);
        return newprice;
    }
    
}