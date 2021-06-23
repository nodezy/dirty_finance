//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Allows another user(s) to change contract variables
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

contract DirtyNFT is Ownable, Authorizable, ERC721, ReentrancyGuard  {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIds;
    Counters.Counter private _NFTIds; //so we can track which NFT's have been added to the system

    struct CreatorInfo {
        address creatorAddress; //wallet address of the NFT creator/infuencer
        string uri; //address of NFT metadata
        uint256 price; //id of the NFT
        uint256 creatorSplit; //percent to split proceeds with creator/pool;
        uint256 mintLimit; //total amount of this NFT to mint
        bool redeemable; //can be purchased with DIRTYCASH (true) or only $dirty (false)
        bool exists;
    }

    mapping(uint256 => CreatorInfo) public creatorInfo; // Info of each NFT artist/infuencer wallet.
    mapping(string => uint) public mintedCountURI;  // Get total # minted by URI.
    mapping(uint256 => uint) public mintedCountID; // Get total # minted by ID.
    address public farmingContract; // Address of the associated farming contract.
    uint private minted;

    constructor() public ERC721("DirtyNFT", "XXXNFT") {}


    function mint(address recipient, uint256 id) public nonReentrant returns (uint256) {

        require(address(farmingContract) != address(0), "Farming contract address is invalid");
        require(msg.sender == address(farmingContract), "Minting not allowed outside of the farming contract");

        CreatorInfo storage creator = creatorInfo[id];

        require(mintedCountbyURI(creator.uri) <= creator.mintLimit, "This NFT has reached its mint limit");

        _tokenIds.increment();
        
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, creator.uri);

        minted = mintedCountURI[creator.uri];
        mintedCountURI[creator.uri] = minted + 1;

        minted = mintedCountID[id];
        mintedCountID[id] = minted + 1;

        return newItemId;

    }

    //returns the total number of minted NFT
    function totalMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    //returns the balance of the erc20 token required for validation
    function checkBalance(address _token, address _holder) public view returns (uint256) {
        IERC20 token = IERC20(_token);
        return token.balanceOf(_holder);
    }
    //returns the number of mints for each specific NFT based on URI
    function mintedCountbyURI(string memory tokenURI) public view returns (uint256) {
        return mintedCountURI[tokenURI];
    }

    function mintedCountbyID(uint256 _id) public view returns (uint256) {
        return mintedCountID[_id];
    }

    function setFarmingContract(address _address) public onlyAuthorized {
        farmingContract = _address;
    }

    function getFarmingContract() external view returns (address) {
        return farmingContract;
    }


    //here is where we populate the NFT infuencer/artist info so they can receive proceeds from purchases with $dirty token
    //and split that with the staking pool based on a split % for each NFT (can be all the same by invoking ALL or can be 
    //different base on each NFT [the ALL invocation assumes 6 NFTs in the collection])
    function setCreatorInfo(address _creator, string memory _URI, uint256 _price, uint256 _splitPercent, uint256 _mintLimit, bool _redeemable) public onlyAuthorized {

        require(bytes(_URI).length > 0, "URI string must not be empty");
        require(_price > 0, "Price must be greater than zero");
        require(_splitPercent >= 0 && _splitPercent <= 100, "Split is not in the correct format");


        _NFTIds.increment();

        uint256 _nftid = _NFTIds.current();

        CreatorInfo storage creator = creatorInfo[_nftid];

        if (_creator == address(0)) {

            creator.creatorAddress = _creator;
            creator.uri = "";
            creator.price = 0;
            creator.creatorSplit = 0;
            creator.mintLimit = 0;
            creator.redeemable = false;
            creator.exists = false;

        } else {

            creator.creatorAddress = _creator;
            creator.uri = _URI;
            creator.price = _price;
            creator.creatorSplit = _splitPercent;
            creator.mintLimit = _mintLimit;
            creator.redeemable = _redeemable;
            creator.exists = true;

        }       

    }

    // Get the current NFT counter
    function getCurrentNFTID() public view returns (uint256) {
        return _NFTIds.current();
    }

    // Set creator address to new, or set to 0 address to clear out the NFT completely
    function setCreatorAddress(uint256 _nftid, address _address) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));

        if (_address == address(0)) {

            creator.creatorAddress = _address;
            creator.uri = "";
            creator.price = 0;
            creator.creatorSplit = 0;
            creator.mintLimit = 0;
            creator.redeemable = false;
            creator.exists = false;

        } else {

            creator.creatorAddress = _address;
        }
    }

    // Get NFT creator/influence/artist info
    function getCreatorInfo(uint256 _nftid) external view returns (address,uint256,uint256,uint256,bool,bool) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return (creator.creatorAddress,creator.price,creator.creatorSplit,creator.mintLimit,creator.redeemable,creator.exists);
    }

    // Get NFT influencer/artist/creator address
    function getCreatorAddress(uint256 _nftid) external view returns (address) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.creatorAddress;
    }

    // Get NFT URI string
    function getCreatorURI(uint256 _nftid) external view returns (string memory) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.uri;
    }

    // Set NFT URI string
    function setNFTUri(uint256 _nftid, string memory _uri) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));        

        creator.uri = _uri;
    }

     // Set cost of NFT
    function setNFTCost(uint256 _nftid, uint256 _cost) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));

        creator.price = _cost;
    }

    // Get cost of NFT
    function getCreatorPrice(uint256 _nftid) external view returns (uint256) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.price;
    }

    // Set profit sharing of NFT
    function setNFTSplit(uint256 _nftid, uint256 _split) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));

        creator.creatorSplit = _split;
    }

    function getCreatorSplit(uint256 _nftid) external view returns (uint256) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.creatorSplit;
    }

    // Set NFT mint limit
    function setNFTmintLimit(uint256 _nftid, uint256 _limit) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));

        creator.mintLimit = _limit;
    }

    function getCreatorMintLimit(uint256 _nftid) external view returns (uint256) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.mintLimit;
    }

    // Set NFT redeemable with DirtyCash
    function setNFTredeemable(uint256 _nftid, bool _redeemable) public onlyAuthorized {

        CreatorInfo storage creator = creatorInfo[_nftid];

        require(creator.creatorAddress == address(_msgSender()) || owner() == address(_msgSender()));

        creator.redeemable = _redeemable;
    }

    function getCreatorRedeemable(uint256 _nftid) external view returns (bool) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.redeemable;
    }

    function getCreatorExists(uint256 _nftid) external view returns (bool) {
        CreatorInfo storage creator = creatorInfo[_nftid];
        return creator.exists;
    }

    
}

