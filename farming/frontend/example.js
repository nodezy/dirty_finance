"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;


// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

// variables used in the file, token name and symbol are just for convinience
var farmAddress = "0xd5612FB04BeCa1Ca47e54D5E47Da9d52FBf3fB48";  //"0x2767aBB5054BEFeF7579FF61E4FE8B40A4b85470";
var farmABI = JSON.stringify([{"inputs":[{"internalType":"contract DirtyCash","name":"_dirty","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawRewardsOnly","type":"event"},{"inputs":[],"name":"DirtyCashAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NFTAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addedLpTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allocMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardLastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardUpdateCycle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blocksPerDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"conversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dirtycash","outputs":[{"internalType":"contract DirtyCash","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dynamicStakingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enableRewardWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"enableRewardWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getAccruedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getConversionNFTPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"getConversionPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getConversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDirtyPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDirtyPerBlockUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getHolderRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getRunningDepositTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalPendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpalloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxDirtyStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLPStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDirtyStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minLPStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"moveRewardsToEscrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accDirtyPerShare","type":"uint256"},{"internalType":"uint256","name":"runningTotal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"promoActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"promoAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"reduceDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescueETHFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardSegment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardWithdrawalStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAllocMul","type":"uint256"}],"name":"setAllocMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpalloc","type":"uint256"},{"internalType":"uint256","name":"_stakealloc","type":"uint256"}],"name":"setAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blockRewardPercentage","type":"uint256"}],"name":"setBlockRewardPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blockRewardUpdateCycle","type":"uint256"}],"name":"setBlockRewardUpdateCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blocksPerDay","type":"uint256"}],"name":"setBlocksPerDay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setConverstionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setDirtyCashAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setDirtyStakingMinMax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"setDynamicStakingEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setLPStakingMinMax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setNFTAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"setPromoStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setUnstakeTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakealloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"timeToUnstake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedCreator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20Tokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"unstakeTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updatePoolReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRewardsOnly","outputs":[],"stateMutability":"nonpayable","type":"function"}]);


var tokenAddress = "0x62EcF49636F282313cda51E2e3cbF0E258e65356";
var tokenName = "Dirty";
var tokenSymbol = "DIRTY";
var dirtytokenABI = JSON.stringify([{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"holderTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"},{"internalType":"bool","name":"_deductTransferFee","type":"bool"}],"name":"rewardsFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_burnAddress","type":"address"}],"name":"setBurnAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"name":"setRegenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_holderTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_regenTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_burnTaxAlloc","type":"uint256"}],"name":"setTaxAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taxPercentage","type":"uint256"}],"name":"setTaxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"taxPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardAmount","type":"uint256"}],"name":"tokenWithRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalHolderFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRegenFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]);


var rewardToken = "0xB02658F05315A7bE78486A53ca618c1bBBFeC61a";
var rewardTokenName = "DirtyCash";
var rewardTOkenSymbol = "DIRTYCASH"
var rewardTokenABI = JSON.stringify([{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rescueETHFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20Tokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]);

var uniLPTokenAddress = "0x63b75801aa9776a0340f65af6654ec53167f0778";
var uniLPTokenName = "Dirty LP Tokens";
var uniLPTokenSymbol = "UNI-V2"
var UniV2ABI = JSON.stringify([{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"holderTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"},{"internalType":"bool","name":"_deductTransferFee","type":"bool"}],"name":"rewardsFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_burnAddress","type":"address"}],"name":"setBurnAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"name":"setRegenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_holderTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_regenTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_burnTaxAlloc","type":"uint256"}],"name":"setTaxAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taxPercentage","type":"uint256"}],"name":"setTaxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"taxPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardAmount","type":"uint256"}],"name":"tokenWithRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalHolderFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRegenFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]);


var nftAddress = "0xa9060dfB2Bb3efd09A67aEfC6b1E78BA0E3159a2";
var nftName = "DirtyNFT"
var nftSymbol = "XXXNFT"
var DirtyNFTABI = JSON.stringify([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_holder","type":"address"}],"name":"checkBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creatorInfo","outputs":[{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"string","name":"collectionName","type":"string"},{"internalType":"string","name":"nftName","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"creatorSplit","type":"uint256"},{"internalType":"uint256","name":"mintLimit","type":"uint256"},{"internalType":"bool","name":"redeemable","type":"bool"},{"internalType":"bool","name":"purchasable","type":"bool"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAllNFTbyAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorMintLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorPurchasable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorRedeemable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorSplit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentNFTID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFarmingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"getIDbyURI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"mintedCountbyID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintedCountbyURI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"remintInitial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescueETHFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"setCreatorAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"string","name":"_collectionName","type":"string"},{"internalType":"string","name":"_nftName","type":"string"},{"internalType":"string","name":"_URI","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_splitPercent","type":"uint256"},{"internalType":"uint256","name":"_mintLimit","type":"uint256"},{"internalType":"bool","name":"_redeemable","type":"bool"},{"internalType":"bool","name":"_purchasable","type":"bool"},{"internalType":"bool","name":"_mintInitial","type":"bool"}],"name":"setCreatorInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setFarmingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setNFTCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_split","type":"uint256"}],"name":"setNFTSplit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"setNFTUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_name","type":"string"}],"name":"setNFTcollectionName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_limit","type":"uint256"}],"name":"setNFTmintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_name","type":"string"}],"name":"setNFTname","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"bool","name":"_purchasable","type":"bool"}],"name":"setNFTpurchasable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"bool","name":"_redeemable","type":"bool"}],"name":"setNFTredeemable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20Tokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]);

let blocknumber;
let timestamp;

let approvedirtytx = false;
let depositdirtytx = false;
let unstakedirtytx = false;
let withdrawdirtytx = false; 
let waitingdirtyunstake = false;

let approvelptx = false;
let depositlptx = false;
let unstakelptx = false;
let withdrawlptx = false; 
let waitinglpunstake = false;

let withdrawdctx = false; 

let dirtyerror = false;
let lperror = false;
let dcerror = false;

let stakinginterval;
let nftinterval;
let totalNFTExist;
let approvedctx = false;

let nfttx = false;

/**
 * Setup the orchestra
 */
function init() {
  
  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Nodezy's test key - don't copy as your mileage may vary
        infuraId: "21d7ff87ab3941cf8cfa4c0cb379a384",
      }
    },

  };

  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}

const getblocknumber = (result) => { 

	blocknumber = result;

}

const getblockstamp = (result) => { 

	timestamp = result.timestamp;
	
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  //console.log("Web3 instance is", web3);

  document.getElementById("connected").style.display = 'block';

  // Load chain information over an HTTP API
  const chainId = await web3.eth.getChainId(function(err, result) {
    if (!err) {
     var mydata = JSON.parse(chainData);
     //console.log(mydata[0].name)
     // the code you're looking for
      var lookup = result;

      // iterate over each element in the array
      for (var i = 0; i < mydata.length; i++){
        // look for the entry with a matching `code` value
        if (mydata[i].chainId == lookup){
           // we found it
          // obj[i].name is the matched result
          document.querySelector("#network-name").textContent = mydata[i].name;
          if (mydata[i].name == "Ethereum Testnet Ropsten") {
            document.getElementById("connected").style.display = 'block';
            document.getElementById("correctnetwork").style.display = "block";
            document.getElementById("incorrectnetwork").style.display = 'none';
            document.getElementById("disconnected").style.display = 'none';


          } else {
            document.getElementById("connected").style.display = 'none';
            document.getElementById("correctnetwork").style.display = 'none';
            document.getElementById("incorrectnetwork").style.display = 'block';
          }
        }
      }
  
    }
  });

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  //console.log("Got accounts", accounts);
  selectedAccount = accounts[0];
  const balance = await web3.eth.getBalance(selectedAccount);
  const ethBalance = web3.utils.fromWei(balance, "ether");
  const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);

  document.querySelector("#selected-account").textContent = selectedAccount;
  document.querySelector("#account-balance").textContent = humanFriendlyBalance;

  var tokencontract = new web3.eth.Contract(JSON.parse(dirtytokenABI),tokenAddress);
  var lpcontract = new web3.eth.Contract(JSON.parse(UniV2ABI),uniLPTokenAddress);
  var rewardcontract = new web3.eth.Contract(JSON.parse(rewardTokenABI),rewardToken);
  var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

 try {

	web3.eth.getBlockNumber().then(getblocknumber);

	 } catch {

	 }

	document.getElementById("dirtytokencontract").innerText = tokenAddress;
	document.getElementById("dirtycashcontract").innerText = rewardToken;
	document.getElementById("lptokencontract").innerText = uniLPTokenAddress;
	document.getElementById("farmingcontract").innerText = farmAddress;


	 /*Dirty Staking*/

    tokencontract.methods.balanceOf(selectedAccount).call(function(err,res){
        if(!err){
           //console.log(web3.utils.fromWei(res));
           var balance = web3.utils.fromWei(res);
           balance = +balance;
           balance = parseFloat(balance).toFixed(2);
            
            document.getElementById("dirty-balance").innerText = balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + tokenSymbol;

            farmingcontract.methods.userInfo('1',selectedAccount).call(function(err,res){
                if(!err){
                   
                   var mytotaldt = web3.utils.fromWei(res.amount);
                   mytotaldt = +mytotaldt;
                   mytotaldt = parseFloat(mytotaldt).toFixed(2);

                   //console.log(+mytotaldt);

                   document.getElementById("mystakeddirty").innerText = mytotaldt.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + tokenSymbol;
                   

                   if (+balance < 21000000 && mytotaldt == 0) {

        				document.getElementById("dtdeposit").style.display = 'none';
        				document.getElementById("uniswapdirty").style.display = 'block';
        				document.getElementById("deposit").classList.add("disabled"); 
        				document.getElementById("dirtyalert").style.display = 'block';
        				document.getElementById("dirtyalert").classList.remove("alert-info"); 
				        document.getElementById("dirtyalert").classList.remove("alert-success"); 
				        document.getElementById("dirtyalert").classList.add("alert-danger");  
        				document.getElementById("dirtyalert").innerText = 'You do not have the minimum required amount for Dirty staking';

        			} else { //user has more than min balance or is already staking

        				document.getElementById("uniswapdirty").style.display = 'none';

			            tokencontract.methods.allowance(selectedAccount, farmAddress).call(function(err,res){
			            	if(!err){

			            		var approved = web3.utils.fromWei(res);
			           			approved = +approved;
			           			approved = parseFloat(approved).toFixed(2);

			           			//console.log(+balance);
			           			//console.log(+approved);

			            		if (+approved < 2100000000 && mytotaldt == 0) {

			            			document.getElementById("dtapprove").style.display = 'block';
			            			document.getElementById("dtdeposit").style.display = 'none';
			            			document.getElementById("dtunstake1").style.display = 'none';

			            			if (dirtyerror) {
				            				document.getElementById("dirtyalert").style.display = 'block';
				            			} else {
				            				document.getElementById("dirtyalert").style.display = 'none';
				            			}

			            			document.getElementById("dtwithdraw").style.display = 'none';


			            			if (!approvedirtytx) {
		            					document.getElementById("dtapprove").removeAttribute("disabled");
			            			}
			            			

			            		} else { //balance is equal to approved amount

			            			document.getElementById("dtapprove").style.display = 'none';		

				            			if (+mytotaldt == 0) {

					                   		document.getElementById("poolreward").innerText = '0.00 ' + tokenSymbol;
					                   		document.getElementById("dtwithdraw").style.display = 'none';

					                    } else {
					                    	
	                
					                    	document.getElementById("mystakeddirty").innerText = mytotaldt.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + tokenSymbol;
					                    	document.getElementById("dtunstake").style.display = 'inline';

					                    	if (!unstakedirtytx && !depositdirtytx) {
					                    		document.getElementById("dtunstake").removeAttribute("disabled");
					                    		document.getElementById("dtunstake1").removeAttribute("disabled");
					                    	}
					                    	
					                    	if (!waitingdirtyunstake && !withdrawdirtytx) {
					                    		//document.getElementById("dtwithdraw").style.display = 'none';
					                    	}
	                    					
					                    	var mypercentleftbehind = mytotaldt * .01;
					                    
					                    	farmingcontract.methods.getHolderRewards(selectedAccount).call(function(err,res){
					                    		if(!err){
					                    			var myholderrewards = web3.utils.fromWei(res);
					                    				if (+res != 0) {
				                    						myholderrewards = +myholderrewards - +mytotaldt;
					                    				}
									                    
									                    myholderrewards = myholderrewards - +mypercentleftbehind;
									                    myholderrewards = parseFloat(myholderrewards).toFixed(2);

									                    document.getElementById("poolreward").innerText = myholderrewards.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + tokenSymbol;

					                    		}
					                    	});
					                    }            		                    

				                    	farmingcontract.methods.unstakeTimer('1',selectedAccount).call(function(err,res){
				                    		if(!err){

				                    			var wdready = +res + 60;

					                    		try {

													web3.eth.getBlock(blocknumber).then(getblockstamp);


												} catch {

												}

				                    			

				                    			if (+res == 9999999999 || mytotaldt == 0) { // staked / enable deposits              	 			
								                    

				                    				if (+mytotaldt < 2100000000) {

				                    					if (!unstakedirtytx) {
				                    						document.getElementById("dtdeposit").style.display = 'block';
				                    						document.getElementById("deposit").removeClass = 'disabled';
				            								document.getElementById("dtwithdraw").style.display = 'none';

				            								if (dirtyerror) {
									            				document.getElementById("dirtyalert").style.display = 'block';
									            			} else {
									            				document.getElementById("dirtyalert").style.display = 'none';
									            			}
				                    					}
								                    	
				            							
				            							if (+mytotaldt > 0) {

								                    	document.getElementById("dtunstake").style.display = 'inline';

								                    	}


							                   		} else {

							                   			document.getElementById("dtunstake1").style.display = 'block';
								                    	document.getElementById("dtdeposit").style.display = 'none';
								                    	document.getElementById("dirtyalert").style.display = 'block';
								                    	if (!dirtyerror && !unstakedirtytx) { 
								                    	document.getElementById("dirtyalert").classList.remove("alert-info"); 
								                    	document.getElementById("dirtyalert").classList.remove("alert-danger"); 
								                    	document.getElementById("dirtyalert").classList.add("alert-success"); 
								                    	document.getElementById("dirtyalert").innerText = 'You are staking the maximum amount of Dirty tokens';
								                    	}

								                    } // if (+mytotaldt < 2100000000)

				                    			} else { // add logic here to enable withdrawal when unstakeTimer reaches zero

				                    				document.getElementById("dtunstake").style.display = 'none';
				                    				document.getElementById("dtdeposit").style.display = 'none';

				                    				if (+mytotaldt > 0) {

					                    				farmingcontract.methods.timeToUnstake('1',selectedAccount).call(function(err,res){
					                    					if(!err){

					                    						//console.log(wdready);
					                    						//console.log(timestamp);

							                    				if (+res == 0 && +wdready < +timestamp) { // enable withdrawal button

							                    						document.getElementById("dtdeposit").style.display = 'none';
							                    						document.getElementById("dtunstake1").style.display = 'none';
							                    						document.getElementById("dtwithdraw").style.display = 'block';

							                    						if(!withdrawdirtytx) {
							                    							document.getElementById("dtwithdraw").removeAttribute("disabled");
							                    							document.getElementById("dirtyalert").style.display = 'block';
													                    	document.getElementById("dirtyalert").classList.remove("alert-info"); 
													                    	document.getElementById("dirtyalert").classList.remove("alert-danger"); 
													                    	document.getElementById("dirtyalert").classList.add("alert-success"); 
													                    	document.getElementById("dirtyalert").innerText = 'You can now withdraw your Dirty tokens';
							                    						} else {
							                    							document.getElementById("dirtyalert").style.display = 'none';	
							                    						}
							                    						
							                    						

							                    												                    					
							                    				} else { // show how much time is left to withdrawal

							                    						
												                    	var timeleft = +res/60;

							                    						document.getElementById("dtdeposit").style.display = 'none';
							                    						document.getElementById("dtunstake1").style.display = 'none';
							                    						document.getElementById("dtwithdraw").style.display = 'block';
							                    						document.getElementById("dtwithdraw").setAttribute("disabled","disabled");
							                    						document.getElementById("dirtyalert").style.display = 'block';
							                    						document.getElementById("dirtyalert").classList.remove("alert-success"); 
												                    	document.getElementById("dirtyalert").classList.add("alert-danger"); 
												                    	document.getElementById("dirtyalert").classList.remove("alert-info"); 
												                    	document.getElementById("dirtyalert").innerText = 'You have '+parseFloat(timeleft).toFixed(2)+' minutes left before you can withdraw';

							                    						

							                    				}
							                    			}

							                    		}); //farming.timetounstake

			                    					}
				                    			} // if (+res == 9999999999)
											}

				                    	}); // farming.unstakeTimer

			                    	

                				} // if (+approved < +balance)						                   						                    
						                    
				            } 
						}); // tokencontract.allowance
						

            		} // if (+balance < 21000000 && mytotaldt == 0) 

            	}

            }); // farming.userInfo

        }
   }); // tokencontract.balanceof

 /* LP Staking */

  lpcontract.methods.balanceOf(selectedAccount).call(function(err,res){
        if(!err){
           //console.log(web3.utils.fromWei(res));
           var balance = web3.utils.fromWei(res);
           balance = +balance;
           balance = parseFloat(balance).toFixed(2);
            
            document.getElementById("dirtylp-balance").innerText = balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + uniLPTokenSymbol;

            farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
                if(!err){
                   
                   var mytotallp = web3.utils.fromWei(res.amount);
                   mytotallp = +mytotallp;
                   mytotallp = parseFloat(mytotallp).toFixed(2);

                   //console.log(+mytotallp);

                   document.getElementById("mystakedlp").innerText = mytotallp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + uniLPTokenSymbol;
                   

                   if (+balance < 1000 && mytotallp == 0) {

        				document.getElementById("lpdeposit").style.display = 'none';
        				document.getElementById("uniswaplp").style.display = 'block';
        				document.getElementById("deposit0").classList.add("disabled"); 
        				document.getElementById("lpalert").style.display = 'block';
        				document.getElementById("lpalert").classList.remove("alert-info"); 
				        document.getElementById("lpalert").classList.remove("alert-success"); 
				        document.getElementById("lpalert").classList.add("alert-danger");  
        				document.getElementById("lpalert").innerText = 'You do not have the minimum required amount for LP staking';

        			} else { //user has more than min balance or is already staking

        				document.getElementById("uniswaplp").style.display = 'none';

			            lpcontract.methods.allowance(selectedAccount, farmAddress).call(function(err,res){
			            	if(!err){

			            		var approved = web3.utils.fromWei(res);
			           			approved = +approved;
			           			approved = parseFloat(approved).toFixed(2);

			           			//console.log(+balance);
			           			//console.log(+approved);

			            		if (+approved < 10000 && mytotallp == 0) {

			            			document.getElementById("lpapprove").style.display = 'block';
			            			document.getElementById("lpdeposit").style.display = 'none';
			            			document.getElementById("lpunstake1").style.display = 'none';
			            			if (lperror) {
			            				document.getElementById("lpalert").style.display = 'block';
			            			} else {
			            				document.getElementById("lpalert").style.display = 'none';
			            			}
			            			
			            			document.getElementById("lpwithdraw").style.display = 'none';

			            			if (!approvelptx) {
		            					document.getElementById("lpapprove").removeAttribute("disabled");
			            			}
			            			

			            		} else { //balance is equal to approved amount

			            			document.getElementById("lpapprove").style.display = 'none';		

				            			if (+mytotallp == 0) {

					                   		document.getElementById("lpwithdraw").style.display = 'none';

					                    } else {
					                    	
	                
					                    	document.getElementById("mystakedlp").innerText = mytotallp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + uniLPTokenSymbol;
					                    	document.getElementById("lpunstake").style.display = 'inline';

					                    	if (!unstakelptx && !depositlptx) {
					                    		document.getElementById("lpunstake").removeAttribute("disabled");
					                    		document.getElementById("lpunstake1").removeAttribute("disabled");
					                    	}
					                    	
					                    	if (!waitinglpunstake && !withdrawlptx) {
					                    		//document.getElementById("lpwithdraw").style.display = 'none';
					                    	}
	                    								                   
					                    }            		                    

				                    	farmingcontract.methods.unstakeTimer('0',selectedAccount).call(function(err,res){
				                    		if(!err){

				                    			var wdready = +res + 60;

					                    		try {

													web3.eth.getBlock(blocknumber).then(getblockstamp);


												} catch {

												}

				                    			

				                    			if (+res == 9999999999 || mytotallp == 0) { // staked  / enable deposits              				
								                    

				                    				if (+mytotallp < 10000) {

				                    					if (!unstakelptx) {
				                    						document.getElementById("lpdeposit").style.display = 'block';
				                    						document.getElementById("deposit0").removeClass = 'disabled';
				                    						document.getElementById("lpwithdraw").style.display = 'none';
				            								if (lperror) {
									            				document.getElementById("lpalert").style.display = 'block';
									            			} else {
									            				document.getElementById("lpalert").style.display = 'none';
									            			}
				                    					}
								                    	
				            							
				            							if (+mytotallp > 0) {

								                    	document.getElementById("lpunstake").style.display = 'inline';

								                    	}


							                   		} else {

							                   			document.getElementById("lpunstake1").style.display = 'block';
								                    	document.getElementById("lpdeposit").style.display = 'none';
								                    	document.getElementById("lpalert").style.display = 'block';
								                    	if (!lperror && !unstakelptx) {
								                    	document.getElementById("lpalert").classList.remove("alert-info"); 
								                    	document.getElementById("lpalert").classList.remove("alert-danger"); 
								                    	document.getElementById("lpalert").classList.add("alert-success"); 
								                    	document.getElementById("lpalert").innerText = 'You are staking the maximum amount of LP tokens';
								                    	}

								                    } // if (+mytotaldt < 2100000000)

				                    			} else { // add logic here to enable withdrawal when unstakeTimer reaches zero

				                    				document.getElementById("lpunstake").style.display = 'none';
				                    				document.getElementById("lpdeposit").style.display = 'none';

				                    				if (+mytotallp > 0) {

					                    				farmingcontract.methods.timeToUnstake('0',selectedAccount).call(function(err,res){
					                    					if(!err){

					                    						//console.log(wdready);
					                    						//console.log(timestamp);

							                    				if (+res == 0 && +wdready < +timestamp) { // enable withdrawal button

							                    						document.getElementById("lpdeposit").style.display = 'none';
							                    						document.getElementById("lpunstake1").style.display = 'none';
							                    						document.getElementById("lpwithdraw").style.display = 'block';

							                    						if(!withdrawlptx) {
							                    							document.getElementById("lpwithdraw").removeAttribute("disabled");
							                    							document.getElementById("lpalert").style.display = 'block';
													                    	document.getElementById("lpalert").classList.remove("alert-info"); 
													                    	document.getElementById("lpalert").classList.remove("alert-danger"); 
													                    	document.getElementById("lpalert").classList.add("alert-success"); 
													                    	document.getElementById("lpalert").innerText = 'You can now withdraw your LP tokens';
							                    						} else {
							                    							document.getElementById("lpalert").style.display = 'none';
							                    						}
							                    						
							                    						

							                    												                    					
							                    				} else { // show how much time is left to withdrawal

							                    						
												                    	var timeleft = +res/60;

							                    						document.getElementById("lpdeposit").style.display = 'none';
							                    						document.getElementById("lpunstake1").style.display = 'none';
							                    						document.getElementById("lpwithdraw").style.display = 'block';
							                    						document.getElementById("lpwithdraw").setAttribute("disabled","disabled");
							                    						document.getElementById("lpalert").style.display = 'block';
							                    						document.getElementById("lpalert").classList.remove("alert-success"); 
												                    	document.getElementById("lpalert").classList.add("alert-danger"); 
												                    	document.getElementById("lpalert").classList.remove("alert-info"); 
												                    	document.getElementById("lpalert").innerText = 'You have '+parseFloat(timeleft).toFixed(2)+' minutes left before you can withdraw';

							                    						

							                    				}
							                    			}

							                    		}); //farming.timetounstake

				                    				}

				                    			} // if (+res == 9999999999)
											}

				                    	}); // farming.unstakeTimer

			                    	

                				} // if (+approved < +balance)						                   						                    
						                    
				            } 
						}); // lpcontract.allowance
						

            		} // if (+balance < 21000000 && mytotaldt == 0) 

            	}

            }); // farming.userInfo

        }
   }); // lpcontract.balanceof

 /* General Functions */

  rewardcontract.methods.balanceOf(selectedAccount).call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var balance = web3.utils.fromWei(res);
                   balance = +balance;
                   balance = parseFloat(balance).toFixed(2);
                    
                    document.getElementById("dirtycash-balance").innerText = balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + rewardTOkenSymbol;
                }
   });

  farmingcontract.methods.getRunningDepositTotal('0').call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var totallp = web3.utils.fromWei(res);
                   totallp = +totallp;
                   totallp = parseFloat(totallp).toFixed(2);
                    
                    document.getElementById("totalstakedlp").innerText = totallp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + uniLPTokenSymbol;
                }
   });


  farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
                if(!err){
                  // console.log(res.amount);
                   var mytotallp = web3.utils.fromWei(res.amount);
                   mytotallp = +mytotallp;
                   mytotallp = parseFloat(mytotallp).toFixed(2);
                    
                    document.getElementById("mystakedlp").innerText = mytotallp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + uniLPTokenSymbol;
                }
   });

  farmingcontract.methods.pendingRewards('0',selectedAccount).call(function(err,res){
                if(!err){
                   //console.log(res);
                   var mylpdc = web3.utils.fromWei(res);
                   mylpdc = +mylpdc;
                   mylpdc = parseFloat(mylpdc).toFixed(2);
                    
                    document.getElementById("pendinglprewards").innerText = mylpdc + " " + rewardTOkenSymbol;

                    farmingcontract.methods.pendingRewards('1',selectedAccount).call(function(err,res){
		                if(!err){
		                   //console.log(res);
		                   var mystdc = web3.utils.fromWei(res);
		                   mystdc = +mystdc;
		                   mystdc = parseFloat(mystdc).toFixed(2);
		                    
		                    document.getElementById("pendingstakerewards").innerText = mystdc.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + rewardTOkenSymbol;

		                    var totalrewards = mylpdc + mystdc;

		                    //total pending rewards added above, can be placed anywhere

		                    if (+totalrewards > 0) {

		                    	//if functionality to move pending rewards to escrow is required
		                    }
		                }
   					});

                }
   });

  farmingcontract.methods.getRunningDepositTotal('1').call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var totalstaked = web3.utils.fromWei(res);
                   totalstaked = +totalstaked;
                   totalstaked = parseFloat(totalstaked).toFixed(2);
                    
                    document.getElementById("totalstakeddirty").innerText = totalstaked.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + tokenSymbol;
                }
   });

  farmingcontract.methods.getAccruedRewards(selectedAccount).call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var totalaccrued = web3.utils.fromWei(res);
                   totalaccrued = +totalaccrued;
                   totalaccrued = parseFloat(totalaccrued).toFixed(2);
                    
                    document.getElementById("dirtycash-unredeemed").innerText = totalaccrued.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + rewardTOkenSymbol;

                    if (+totalaccrued > 0) {

                    	farmingcontract.methods.rewardWithdrawalStatus().call(function(err,res){
			  				if(!err){

			  					if (res == true) {

			  						//reward withdrawals are enabled
			  						document.getElementById("dcalert").style.display = 'block';
									document.getElementById("dcalert").classList.remove("alert-danger");
						        	document.getElementById("dcalert").classList.remove("alert-success"); 
						        	document.getElementById("dcalert").classList.add("alert-info"); 
									document.getElementById("dcalert").innerText = 'DirtyCash withdrawals are enabled';
									document.getElementById("dcwithdraw").style.display = 'block';

			  					} else {

			  						document.getElementById("dcalert").style.display = 'block';
									document.getElementById("dcalert").classList.remove("alert-danger"); 
						        	document.getElementById("dcalert").classList.remove("alert-success"); 
						        	document.getElementById("dcalert").classList.add("alert-info"); 
									document.getElementById("dcalert").innerText = 'DirtyCash withdrawals are not currently enabled';
									document.getElementById("dcwithdraw").style.display = 'none';
			  					}

			  				}
					  });

                    } else {

                    	document.getElementById("dcwithdraw").style.display = 'none';
                    }
                }
   });

  farmingcontract.methods.getTotalPendingRewards(selectedAccount).call(function(err,res){
    	if (!err) {

    		var totalpending = web3.utils.fromWei(res);

    		if (+totalpending > 10) {

    			document.getElementById("dcescrow").style.display = 'block';
    			
    		} else {

    			document.getElementById("dcescrow").style.display = 'none';

    		}
    	}

    });

  /**/


  // Display fully loaded UI for wallet data
  document.querySelector("#btn-connect").style.display = "none";
  document.querySelector("#btn-disconnect").style.display = "block";

  // Load NFT Gallery
   //loadgallery(true);
}


/* Dirty Functions */

async function approveDirty(id) {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var tokencontract = new web3.eth.Contract(JSON.parse(dirtytokenABI),tokenAddress);

    tokencontract.methods.balanceOf(selectedAccount).call(function(err,res){
    	if (!err) {
    		var totalsupply = res;
    	}

    	dirtyerror = false;
    	

    	web3.eth.sendTransaction(
          {from: selectedAccount,
          to: tokenAddress,
          value: 0, 
          gasprice: 100000, // 100000 = 10 gwei
           gas: 50000,   // gas limit
          data: tokencontract.methods.approve(farmAddress, '2100000000000000000000000000').encodeABI()
              }, function(err, transactionHash) {
        	if (err) {
         
	      	} else {
	      		if (id > 0) {
	      			nfttx = true;
	      			document.getElementById(""+id+"alert").style.display = 'none';
	      			document.getElementById(""+id+"redeem").setAttribute("disabled","disabled");
			        document.getElementById(""+id+"purchase").setAttribute("disabled","disabled");
			        document.getElementById(""+id+"showLoading").style.display = 'block';  

	      		} else {
	      			document.getElementById("dirtyalert").style.display = 'none';
			        document.getElementById("dtapprove").setAttribute("disabled","disabled");
			        document.getElementById("showLoading2").style.display = 'block';  
			        approvedirtytx = true;
	      		}
	      		
	      	}
	      })
	    .on('receipt', function(receipt){
	   			if (id > 0) {
	   				nfttx = false;
	   				document.getElementById(""+id+"showLoading").style.display = 'none'; 
				    document.getElementById(""+id+"redeem").removeAttribute("disabled");
					document.getElementById(""+id+"purchase").removeAttribute("disabled");
	   			} else {
	   				document.getElementById("showLoading2").style.display = 'none'; 
				    approvedirtytx = false;

				    fetchAccountData();
	   			}
	    

	    })
		.on('error', function(error){ // If a out of gas error, the second parameter is the receipt.
			if (id > 0) {
				nfttx = false;
				document.getElementById(""+id+"showLoading").style.display = 'none'; 
					    
			    document.getElementById(""+id+"alert").style.display = 'block';
				document.getElementById(""+id+"alert").classList.add("alert-danger");  
				document.getElementById(""+id+"alert").classList.remove("alert-info"); 
			    document.getElementById(""+id+"alert").classList.remove("alert-success"); 

			    if (error.receipt === undefined) {
		    		document.getElementById(""+id+"alert").innerHTML = error.message;
			    } else {
			    	document.getElementById(""+id+"alert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
			    }
			} else {
				document.getElementById("showLoading2").style.display = 'none'; 
	    
			    document.getElementById("dirtyalert").style.display = 'block';
				document.getElementById("dirtyalert").classList.add("alert-danger");  
				document.getElementById("dirtyalert").classList.remove("alert-info"); 
			    document.getElementById("dirtyalert").classList.remove("alert-success"); 

			    if (error.receipt === undefined) {
		    		document.getElementById("dirtyalert").innerHTML = error.message;
			    } else {
			    	document.getElementById("dirtyalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
			    }
				//console.log(JSON.stringify(error));
				
			    approvedirtytx = false;
			    dirtyerror = true;

			    fetchAccountData();
			}
	    

		});

    });
  
    
}

async function depositDirty() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
    var amount = document.getElementById("dirtyamount").value;

    var tokencontract = new web3.eth.Contract(JSON.parse(dirtytokenABI),tokenAddress);

    if (+amount == 0) {

    	document.getElementById("dirtyalert").style.display = 'block';
		document.getElementById("dirtyalert").classList.add("alert-danger");  
		document.getElementById("dirtyalert").classList.remove("alert-info"); 
	    document.getElementById("dirtyalert").classList.remove("alert-success"); 
		document.getElementById("dirtyalert").innerText = 'Please enter an amount greater than zero';

    } else {
    
		farmingcontract.methods.userInfo('1',selectedAccount).call(function(err,res){
		    if(!err){
				var mytotaldt = web3.utils.fromWei(res.amount);
		        mytotaldt = +mytotaldt;
		        mytotaldt = parseFloat(mytotaldt).toFixed(2);

		        if ((+mytotaldt == 0 && +amount < 21000000) || (+mytotaldt == 0  && +amount > 2100000000)) {

						document.getElementById("dirtyalert").style.display = 'block';
						document.getElementById("dirtyalert").classList.add("alert-danger");  
						document.getElementById("dirtyalert").classList.remove("alert-info"); 
					    document.getElementById("dirtyalert").classList.remove("alert-success"); 
						document.getElementById("dirtyalert").innerText = 'Please enter an amount between 21 million and 2.1 Billion Dirty Tokens';

				} else {

					tokencontract.methods.balanceOf(selectedAccount).call(function(err,res){
					    	if(!err){

					    	 	var balance = web3.utils.fromWei(res);

					    	 	if (+amount > +balance) {

					    	 		document.getElementById("dirtyalert").style.display = 'block';
					    	 		document.getElementById("dirtyalert").classList.add("alert-danger");  
									document.getElementById("dirtyalert").classList.remove("alert-info"); 
						        	document.getElementById("dirtyalert").classList.remove("alert-success"); 
									document.getElementById("dirtyalert").innerText = 'You do not have '+amount+' Dirty tokens in your wallet balance. Your balance is '+parseFloat(balance).toFixed(2)+' DIRTY';

					    	 	} else {

					    	 		 	if (+amount + +mytotaldt > 2100000000) {

											document.getElementById("dirtyalert").style.display = 'block';
											document.getElementById("dirtyalert").classList.remove("alert-info"); 
								        	document.getElementById("dirtyalert").classList.remove("alert-success"); 
								        	document.getElementById("dirtyalert").classList.add("alert-danger"); 
											document.getElementById("dirtyalert").innerText = 'This deposit would put you over the maximum allowed staking amount';

								        } else {

								        	dirtyerror = false;
								   			
								        	web3.eth.sendTransaction(
										          {from: selectedAccount,
										          to: farmAddress,
										          value: 0, 
										          gasprice: 100000, // 100000 = 10 gwei
										          // gas: 50000,   // gas limit
										          data: farmingcontract.methods.deposit('1', web3.utils.toWei(amount)).encodeABI()
										              }, function(err, transactionHash) {
										        	if (err) {
										         
											      	} else {
											      		document.getElementById("dirtyalert").style.display = 'none';
												        document.getElementById("deposit").setAttribute("disabled","disabled");
												        document.getElementById("dtunstake").setAttribute("disabled","disabled");
												        document.getElementById("dtunstake1").setAttribute("disabled","disabled");
												        document.getElementById("showLoading2").style.display = 'block';  
												        document.getElementById("dirtyamount").value = '';
												        depositdirtytx = true;
											      	}
											      })
											    .on('receipt', function(receipt){
											   
											    document.getElementById("showLoading2").style.display = 'none'; 
											    document.getElementById("deposit").removeAttribute("disabled");
											    document.getElementById("dtunstake").removeAttribute("disabled");
											    document.getElementById("dtunstake1").removeAttribute("disabled");
											    depositdirtytx = false;
											    
											    fetchAccountData();

												})
												.on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

											    document.getElementById("showLoading2").style.display = 'none'; 
											    document.getElementById("deposit").removeAttribute("disabled");
											    document.getElementById("dtunstake").removeAttribute("disabled");
											    document.getElementById("dtunstake1").removeAttribute("disabled");
											    
											    document.getElementById("dirtyalert").style.display = 'block';
												document.getElementById("dirtyalert").classList.add("alert-danger");  
												document.getElementById("dirtyalert").classList.remove("alert-info"); 
											    document.getElementById("dirtyalert").classList.remove("alert-success"); 

											    if (error.receipt === undefined) {
										    		document.getElementById("dirtyalert").innerHTML = error.message;
											    } else {
											    	document.getElementById("dirtyalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
											    }
												//console.log(JSON.stringify(error));
												
											    depositdirtytx = false;
											    dirtyerror = true;

											    fetchAccountData();
											}); // sendTransaction

											} // if (+amount + +mytotaldt > 2100000000)

					    	 	} // if (+amount > +balance)

					    	} // if (!err) 
				    	}); //tokencontract.balanceof	

				} // if (+mytotaldt == 0)

		       
			} // if (!err) 	

		}); //farmingcontract.userinfo
	  
	} // if (+amount == 0) 
	    	
    
}

async function unstakeDirty() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

    dirtyerror = false;
    

    web3.eth.sendTransaction(
          {from: selectedAccount,
          to: farmAddress,
          value: 0, 
          gasprice: 100000, // 100000 = 10 gwei
          // gas: 50000,   // gas limit
          data: farmingcontract.methods.unstake('1').encodeABI()
              }, function(err, transactionHash) {
        	if (err) {
         
	      	} else {
	      		document.getElementById("dirtyalert").style.display = 'none';
	      		document.getElementById("dtdeposit").style.display = 'none';
		        document.getElementById("dtunstake").setAttribute("disabled","disabled");
		        document.getElementById("dtunstake1").setAttribute("disabled","disabled");
		        document.getElementById("dtunstake1").style.display = 'block';
		        document.getElementById("showLoading2").style.display = 'block';  
		        unstakedirtytx = true;
	      	}
	      })
	    .on('receipt', function(receipt){
	   
	    document.getElementById("showLoading2").style.display = 'none'; 
	    unstakedirtytx = false;
	    waitingdirtyunstake = true;
	    

	    fetchAccountData();

	    })
		.on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

	    document.getElementById("showLoading2").style.display = 'none'; 
	    
	    document.getElementById("dirtyalert").style.display = 'block';
		document.getElementById("dirtyalert").classList.add("alert-danger");  
		document.getElementById("dirtyalert").classList.remove("alert-info"); 
	    document.getElementById("dirtyalert").classList.remove("alert-success"); 

	    if (error.receipt === undefined) {
    		document.getElementById("dirtyalert").innerHTML = error.message;
	    } else {
	    	document.getElementById("dirtyalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
	    }
		//console.log(JSON.stringify(error));
		
	    unstakedirtytx = false;
	    waitingdirtyunstake = false;
	    dirtyerror = true;

	    fetchAccountData();
	}); // sendTransaction


}

async function withdrawDirty() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

    farmingcontract.methods.userInfo('1',selectedAccount).call(function(err,res){
        if(!err){
          // console.log(res.amount);
           var mytotalstake = web3.utils.fromWei(res.amount);
           mytotalstake = +mytotalstake;
           mytotalstake = parseFloat(mytotalstake).toFixed(2);

           dirtyerror = false;
           

           web3.eth.sendTransaction(
		          {from: selectedAccount,
		          to: farmAddress,
		          value: 0, 
		          gasprice: 100000, // 100000 = 10 gwei
		          // gas: 50000,   // gas limit
		          data: farmingcontract.methods.withdraw('1',res.amount).encodeABI()
		              }, function(err, transactionHash) {
		        	if (err) {
		         
			      	} else {
			      		document.getElementById("dirtyalert").style.display = 'none';
				        document.getElementById("dtwithdraw").setAttribute("disabled","disabled");
				        document.getElementById("showLoading2").style.display = 'block';  
				        withdrawdirtytx = true;
			      	}
			      })
			    .on('receipt', function(receipt){
			   
			    document.getElementById("showLoading2").style.display = 'none'; 
			    document.getElementById("dtwithdraw").style.display = 'none'; 
			    document.getElementById("dirtyalert").style.display = 'none';
			    document.getElementById("poolreward").innerText = '0.00 ' + tokenSymbol;
			    document.getElementById("mystakeddirty").innerText = '0.00 ' + tokenSymbol;
			    withdrawdirtytx = false;
			    waitingdirtyunstake = false;

			    fetchAccountData();

			    })
				.on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

			    document.getElementById("showLoading2").style.display = 'none'; 
			    
			    document.getElementById("dirtyalert").style.display = 'block';
				document.getElementById("dirtyalert").classList.add("alert-danger");  
				document.getElementById("dirtyalert").classList.remove("alert-info"); 
			    document.getElementById("dirtyalert").classList.remove("alert-success"); 

			    if (error.receipt === undefined) {
		    		document.getElementById("dirtyalert").innerHTML = error.message;
			    } else {
			    	document.getElementById("dirtyalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
			    }
				//console.log(JSON.stringify(error));
				
			    withdrawdirtytx = false;
			    waitingdirtyunstake = false;
			    dirtyerror = true;

			    //fetchAccountData();
			}); // sendTransaction

       }
    });

}



/* LP Functions */

async function approveLP() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var lpcontract = new web3.eth.Contract(JSON.parse(UniV2ABI),uniLPTokenAddress);

    lpcontract.methods.balanceOf(selectedAccount).call(function(err,res){
    	if (!err) {
    		var totalsupply = res;
    	}

    	lperror = false;
    	

	    	web3.eth.sendTransaction(
	          {from: selectedAccount,
	          to: uniLPTokenAddress,
	          value: 0, 
	          gasprice: 100000, // 100000 = 10 gwei
	          // gas: 50000,   // gas limit
	          data: lpcontract.methods.approve(farmAddress, '10000000000000000000000').encodeABI()
	              }, function(err, transactionHash) {
	        	if (err) {
	         
		      	} else {
		      		document.getElementById("lpalert").style.display = 'none';
			        document.getElementById("lpapprove").setAttribute("disabled","disabled");
			        document.getElementById("showLoading1").style.display = 'block';  
			        approvelptx = true;
			        
		      	}
		      })
		    .on('receipt', function(receipt){
		   
		    document.getElementById("showLoading1").style.display = 'none'; 
		    approvelptx = false;

		    fetchAccountData();

		    })

		    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

		    document.getElementById("showLoading1").style.display = 'none'; 
		    
		    document.getElementById("lpalert").style.display = 'block';
			document.getElementById("lpalert").classList.add("alert-danger");  
			document.getElementById("lpalert").classList.remove("alert-info"); 
		    document.getElementById("lpalert").classList.remove("alert-success"); 

		    if (error.receipt === undefined) {
	    		document.getElementById("lpalert").innerHTML = error.message;
		    } else {
		    	document.getElementById("lpalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
		    }
			//console.log(JSON.stringify(error));
			
		    approvelptx = false;
		    lperror = true;

		    fetchAccountData();
		});

    });
  
    
}

async function depositLP() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
    var amount = document.getElementById("lpamount").value;

    var lpcontract = new web3.eth.Contract(JSON.parse(UniV2ABI),uniLPTokenAddress);

    if (+amount == 0) {

		document.getElementById("lpalert").style.display = 'block';
		document.getElementById("lpalert").classList.add("alert-danger");  
		document.getElementById("lpalert").classList.remove("alert-info"); 
	    document.getElementById("lpalert").classList.remove("alert-success"); 
		document.getElementById("lpalert").innerText = 'Please enter an amount greater than zero';

    } else {

		farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
		    if(!err){
	    		var mytotallp = web3.utils.fromWei(res.amount);
	            mytotallp = +mytotallp;
	            mytotallp = parseFloat(mytotallp).toFixed(2);

	            if (mytotallp == 0 & +amount < 1000 || mytotallp == 0 && +amount > 10000) {

	            	document.getElementById("lpalert").style.display = 'block';
					document.getElementById("lpalert").classList.add("alert-danger");  
					document.getElementById("lpalert").classList.remove("alert-info"); 
				    document.getElementById("lpalert").classList.remove("alert-success"); 
					document.getElementById("lpalert").innerText = 'Please enter an greater than 1000 or less than 10,000 UniV2 LP Tokens';

	            } else {

	            	lpcontract.methods.balanceOf(selectedAccount).call(function(err,res){
				    	if(!err){

				    	 	var balance = web3.utils.fromWei(res);

				    	 	if (+amount > +balance) {

				    	 		document.getElementById("lpalert").style.display = 'block';
				    	 		document.getElementById("lpalert").classList.add("alert-danger");  
								document.getElementById("lpalert").classList.remove("alert-info"); 
					        	document.getElementById("lpalert").classList.remove("alert-success"); 
								document.getElementById("lpalert").innerText = 'You do not have '+amount+' LP tokens in your wallet balance. Your balance is '+parseFloat(balance).toFixed(2)+' UniV2';

				    	 	} else {

				    	 		if (+amount + +mytotallp > 10000) {

					            	var allowable = 10000 - +mytotallp;

									document.getElementById("lpalert").style.display = 'block';
									document.getElementById("lpalert").classList.remove("alert-info"); 
						        	document.getElementById("lpalert").classList.remove("alert-success"); 
						        	document.getElementById("lpalert").classList.add("alert-danger");  
									document.getElementById("lpalert").innerText = 'This deposit would put you over the maximum allowed staking amount. You may deposit '+allowable+' UniV2 LP Tokens';

					            } else {

				            		lperror = false;
					       			

					            	web3.eth.sendTransaction(
								          {from: selectedAccount,
								          to: farmAddress,
								          value: 0, 
								          gasprice: 100000, // 100000 = 10 gwei
								          // gas: 50000,   // gas limit
								          data: farmingcontract.methods.deposit('0', web3.utils.toWei(amount)).encodeABI()
								              }, function(err, transactionHash) {

								              	var hash = transactionHash;
								        	if (err) {
								         
									      	} else {
									      		document.getElementById("lpalert").style.display = 'none';
										        document.getElementById("deposit0").setAttribute("disabled","disabled");
										        document.getElementById("lpunstake").setAttribute("disabled","disabled");
										        document.getElementById("lpunstake1").setAttribute("disabled","disabled");
										        document.getElementById("showLoading1").style.display = 'block';  
										        document.getElementById("lpamount").value = '';
										        depositlptx = true;
										        
									      	}
									      })
									    .on('receipt', function(receipt){
									   
									    document.getElementById("showLoading1").style.display = 'none'; 
									    document.getElementById("deposit0").removeAttribute("disabled");
									    document.getElementById("lpunstake").removeAttribute("disabled");
									    document.getElementById("lpunstake1").removeAttribute("disabled");
									    depositlptx = false;
									    

									    fetchAccountData();

									    })

									    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

									    document.getElementById("showLoading1").style.display = 'none'; 
									    document.getElementById("deposit0").removeAttribute("disabled");
									    document.getElementById("lpunstake").removeAttribute("disabled");
									    document.getElementById("lpunstake1").removeAttribute("disabled");
									    
									    document.getElementById("lpalert").style.display = 'block';
										document.getElementById("lpalert").classList.add("alert-danger");  
										document.getElementById("lpalert").classList.remove("alert-info"); 
									    document.getElementById("lpalert").classList.remove("alert-success"); 

									    if (error.receipt === undefined) {
								    		document.getElementById("lpalert").innerHTML = error.message;
									    } else {
									    	document.getElementById("lpalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
									    }
										//console.log(JSON.stringify(error));
										
									    depositlptx = false;
									    lperror = true;

									    fetchAccountData();
									    
									}); // sendTransaction

					            } // if (+amount + +mytotallp > 2100000000)

					        } // if (+amount > +balance)

					    } // if (!err)

				    });	// lpcontract.balanceof

	            } // if (mytotallp == 0 & +amount < 1000 || mytotallp == 0 && +amount > 10000)

	            
	    	} // if (!err)


		}); //farmingcontract.userinfo

    	 	
    } // if (+amount == 0)
    
    
}

async function unstakeLP() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

    lperror = false;
    

    web3.eth.sendTransaction(
          {from: selectedAccount,
          to: farmAddress,
          value: 0, 
          gasprice: 100000, // 100000 = 10 gwei
          // gas: 50000,   // gas limit
          data: farmingcontract.methods.unstake('0').encodeABI()
              }, function(err, transactionHash) {
        	if (err) {
         
	      	} else {
	      		document.getElementById("lpalert").style.display = 'none';
	      		document.getElementById("lpdeposit").style.display = 'none';
		        document.getElementById("lpunstake").setAttribute("disabled","disabled");
		        document.getElementById("lpunstake1").setAttribute("disabled","disabled");
		        document.getElementById("lpunstake1").style.display = 'block';
		        document.getElementById("showLoading1").style.display = 'block';  
		        unstakelptx = true;
		         
	      	}
	      })
	    .on('receipt', function(receipt){
	   
	    document.getElementById("showLoading1").style.display = 'none'; 
	    unstakelptx = false;
	    
	    waitinglpunstake = true;
	    

	    fetchAccountData();

	    })

	    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

	    document.getElementById("showLoading1").style.display = 'none'; 

	    document.getElementById("lpalert").style.display = 'block';
		document.getElementById("lpalert").classList.add("alert-danger");  
		document.getElementById("lpalert").classList.remove("alert-info"); 
	    document.getElementById("lpalert").classList.remove("alert-success"); 

	    if (error.receipt === undefined) {
    		document.getElementById("lpalert").innerHTML = error.message;
	    } else {
	    	document.getElementById("lpalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
	    }
		//console.log(JSON.stringify(error));
		
	    unstakelptx = false;
	    waitinglpunstake = false;
	    lperror = true;

	    fetchAccountData();
	}); // sendTransaction


}

async function withdrawLP() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

    farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
                if(!err){
                  // console.log(res.amount);
                   var mytotalstake = web3.utils.fromWei(res.amount);
                   mytotalstake = +mytotalstake;
                   mytotalstake = parseFloat(mytotalstake).toFixed(2);

                   lperror = false;
                   

                   web3.eth.sendTransaction(
				          {from: selectedAccount,
				          to: farmAddress,
				          value: 0, 
				          gasprice: 100000, // 100000 = 10 gwei
				          // gas: 50000,   // gas limit
				          data: farmingcontract.methods.withdraw('0',res.amount).encodeABI()
				              }, function(err, transactionHash) {
				        	if (err) {
				         
					      	} else {
						        document.getElementById("lpwithdraw").setAttribute("disabled","disabled");
						        document.getElementById("showLoading1").style.display = 'block';  
						        document.getElementById("lpalert").style.display = 'none';
						        withdrawlptx = true;
						        
					      	}
					      })
					    .on('receipt', function(receipt){
					   
					    document.getElementById("showLoading1").style.display = 'none'; 
					    document.getElementById("lpwithdraw").style.display = 'none'; 
					    document.getElementById("lpalert").style.display = 'none';
					    document.getElementById("mystakedlp").innerText = '0.00 ' + tokenSymbol;
					    withdrawlptx = false;
					    waitinglpunstake = false;
					   

					    fetchAccountData();

					    })

					    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

					    document.getElementById("showLoading1").style.display = 'none'; 
					   
					    document.getElementById("lpalert").style.display = 'block';
						document.getElementById("lpalert").classList.add("alert-danger");  
						document.getElementById("lpalert").classList.remove("alert-info"); 
					    document.getElementById("lpalert").classList.remove("alert-success"); 

					    if (error.receipt === undefined) {
				    		document.getElementById("lpalert").innerHTML = error.message;
					    } else {
					    	document.getElementById("lpalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
					    }
						//console.log(JSON.stringify(error));
						
					    withdrawlptx = false;
					    waitinglpunstake = false;
					    lperror = true;

					    //fetchAccountData();
					}); // sendTransaction

               }
    });

}

/* DIRTYCASH Functions */

async function approveDC(id) {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var rewardcontract = new web3.eth.Contract(JSON.parse(rewardTokenABI),rewardToken);

    rewardcontract.methods.totalSupply().call(function(err,res){
    	if (!err) {
    		var totalsupply = res;
    	}

    	dcerror = false;    	

    	web3.eth.sendTransaction(
          {from: selectedAccount,
          to: rewardToken,
          value: 0, 
          gasprice: 100000, // 100000 = 10 gwei
           gas: 50000,   // gas limit
          data: rewardcontract.methods.approve(farmAddress, totalsupply).encodeABI()
              }, function(err, transactionHash) {
        	if (err) {
         
	      	} else {
	      		document.getElementById(""+id+"alert").style.display = 'none';
		        document.getElementById(""+id+"redeem").setAttribute("disabled","disabled");
		        document.getElementById(""+id+"purchase").setAttribute("disabled","disabled");
		        document.getElementById(""+id+"showLoading").style.display = 'block';  
		        approvedctx = true;
	      	}
	      })
	    .on('receipt', function(receipt){
	   
	    document.getElementById(""+id+"showLoading").style.display = 'none'; 
	    document.getElementById(""+id+"alert").innerHTML = ''; 
	    document.getElementById(""+id+"alert").style.display = 'none'; 
	    document.getElementById(""+id+"redeem").removeAttribute("disabled");
		document.getElementById(""+id+"purchase").removeAttribute("disabled");
	    approvedctx = false;

	    //fetchAccountData();

	    })
		.on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

	    document.getElementById(""+id+"showLoading").style.display = 'none'; 
	    
	    document.getElementById(""+id+"alert").style.display = 'block';
		document.getElementById(""+id+"alert").classList.add("alert-danger");  
		document.getElementById(""+id+"alert").classList.remove("alert-info"); 
	    document.getElementById(""+id+"alert").classList.remove("alert-success"); 

	    if (error.receipt === undefined) {
    		document.getElementById(""+id+"alert").innerHTML = error.message;
	    } else {
	    	document.getElementById(""+id+"alert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
	    }
		//console.log(JSON.stringify(error));
		
	    approvedctx = false;
	    dcerror = true;

	    //fetchAccountData();

		});

    });
  
    
}

async function escrowDC() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

    dcerror = false;

       web3.eth.sendTransaction(
	          {from: selectedAccount,
	          to: farmAddress,
	          value: 0, 
	          gasprice: 100000, // 100000 = 10 gwei
	          // gas: 50000,   // gas limit
	          data: farmingcontract.methods.moveRewardsToEscrow(selectedAccount).encodeABI()
	              }, function(err, transactionHash) {
	        	if (err) {
	         
		      	} else {
			        document.getElementById("dcescrow").setAttribute("disabled","disabled");
			        document.getElementById("showLoading3").style.display = 'block';  
			        document.getElementById("dcalert1").style.display = 'none';
			        withdrawdctx = true;
		      	}
		      })
		    .on('receipt', function(receipt){
		   
		    document.getElementById("dcescrow").removeAttribute("disabled");
		    document.getElementById("showLoading3").style.display = 'none'; 
		    document.getElementById("dcescrow").style.display = 'none'; 
		    document.getElementById("dcalert1").style.display = 'none';
		    
		    withdrawdctx = false;
		    

		    fetchAccountData();

		    })

		    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

		    document.getElementById("showLoading3").style.display = 'none'; 
		   
		    document.getElementById("dcalert1").style.display = 'block';
			document.getElementById("dcalert1").classList.add("alert-danger");  
			document.getElementById("dcalert1").classList.remove("alert-info"); 
		    document.getElementById("dcalert1").classList.remove("alert-success"); 

		    if (error.receipt === undefined) {
	    		document.getElementById("dcalert1").innerHTML = error.message;
		    } else {
		    	document.getElementById("dcalert1").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
		    }
			//console.log(JSON.stringify(error));
			
		    withdrawdctx = false;
		    dcerror = true;
		}); // sendTransaction

}
   

async function withdrawDC() {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);

                    
       web3.eth.sendTransaction(
	          {from: selectedAccount,
	          to: farmAddress,
	          value: 0, 
	          gasprice: 100000, // 100000 = 10 gwei
	          // gas: 50000,   // gas limit
	          data: farmingcontract.methods.withdrawRewardsOnly().encodeABI()
	              }, function(err, transactionHash) {
	        	if (err) {
	         
		      	} else {
			        document.getElementById("dcwithdraw").setAttribute("disabled","disabled");
			        document.getElementById("showLoading3").style.display = 'block';  
			        withdrawdctx = true;
		      	}
		      })
		    .on('receipt', function(receipt){
		   
		    document.getElementById("dcwithdraw").removeAttribute("disabled");
		    document.getElementById("showLoading3").style.display = 'none'; 
		    document.getElementById("dcwithdraw").style.display = 'none'; 
		    document.getElementById("dcalert1").style.display = 'none';
		    
		    withdrawdctx = false;
		    

		    fetchAccountData();

		    })

		    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

		    document.getElementById("showLoading3").style.display = 'none'; 
		   
		    document.getElementById("dcalert1").style.display = 'block';
			document.getElementById("dcalert1").classList.add("alert-danger");  
			document.getElementById("dcalert1").classList.remove("alert-info"); 
		    document.getElementById("dcalert1").classList.remove("alert-success"); 

		    if (error.receipt === undefined) {
	    		document.getElementById("dcalert").innerHTML = error.message;
		    } else {
		    	document.getElementById("dcalert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
		    }
			//console.log(JSON.stringify(error));
			
		    withdrawdctx = false;
		    dcerror = true;
		}); // sendTransaction

}

async function redeemNFT(id) {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
    var rewardcontract = new web3.eth.Contract(JSON.parse(rewardTokenABI),rewardToken);
    var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);


    nftcontract.methods.getCreatorPrice(id).call(function(err,res){
		if(!err){

			var price = web3.utils.fromWei(res);
			price = +price;

			console.log(price);

			rewardcontract.methods.balanceOf(selectedAccount).call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var balance = web3.utils.fromWei(res);
                   balance = +balance;
                   balance = parseFloat(balance).toFixed(2);

                    farmingcontract.methods.getTotalRewards(selectedAccount).call(function(err,res){
		                if(!err){
		                   //console.log(web3.utils.fromWei(res));
		                   var totalaccrued = web3.utils.fromWei(res);
		                   totalaccrued = +totalaccrued;
		                   totalaccrued = parseFloat(totalaccrued).toFixed(2);

		                   //document.getElementById("dirtycash-balance").innerText = balance + " " + rewardTOkenSymbol;

		                   if (+totalaccrued > +price) { 

		                   		console.log('redeeming NFT');

		                   		web3.eth.sendTransaction(
						          {from: selectedAccount,
						          to: farmAddress,
						          value: 0, 
						          gasprice: 100000, // 100000 = 10 gwei
						          // gas: 50000,   // gas limit
						          data: farmingcontract.methods.redeem(id).encodeABI()
						              }, function(err, transactionHash) {
						        	if (err) {
						         
							      	} else {
							      		nfttx = true;
							      		document.getElementById(""+id+"alert").style.display = 'none';
								        document.getElementById(""+id+"redeem").setAttribute("disabled","disabled");
								        document.getElementById(""+id+"purchase").setAttribute("disabled","disabled");
								        document.getElementById(""+id+"showLoading").style.display = 'block';  
								        
							      	}
							      })
							    .on('receipt', function(receipt){

							    	//console.log(receipt.logs[0].topics[3]);
							    	//console.log(receipt.transactionHash);
							   
							    document.getElementById(""+id+"showLoading").style.display = 'none'; 
							    document.getElementById(""+id+"redeem").removeAttribute("disabled");
								document.getElementById(""+id+"purchase").removeAttribute("disabled");
							    							    
							    fetchAccountData();
							    loadgallery(false);

							    document.getElementById("ModalLabel1").innerHTML = '';
							    document.getElementById("ModalLabel1").innerText = 'Purchase Complete';
							    document.getElementById("ModalBody1").innerHTML = '';
							    document.getElementById("ModalBody1").innerHTML = '<div style="word-break:break-word">Your NFT has been minted at transaction hash <a href="https://ropsten.etherscan.io/tx/'+receipt.transactionHash+'" target="_blank">'+receipt.transactionHash+'</a>.<br><br>You can add your NFT to your mobile wallet (Metamask, Trustwallet) by clicking on "Collectibles" and pasting in the following information:<br><br>Contract: '+nftAddress+'<br><br>TokenID: '+parseInt(receipt.logs[0].topics[3])+'<br><br>Thank you for supporting the Dirty Finance project!</div>';
							    $('#Modal1').modal('show');

							    nfttx = false;

							    })

							    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

							    nfttx = false;
						   
							    document.getElementById(""+id+"showLoading").style.display = 'none'; 
	    
							    document.getElementById(""+id+"alert").style.display = 'block';
								document.getElementById(""+id+"alert").classList.add("alert-danger");  
								document.getElementById(""+id+"alert").classList.remove("alert-info"); 
							    document.getElementById(""+id+"alert").classList.remove("alert-success"); 

							    if (error.receipt === undefined) {
						    		document.getElementById(""+id+"alert").innerHTML = error.message;
							    } else {
							    	document.getElementById(""+id+"alert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
							    }
								}); // sendTransaction

		                   } else {

		                   		if (+balance > +price) {

		                   			 rewardcontract.methods.allowance(selectedAccount, farmAddress).call(function(err,res){
						            	if(!err){

						            		var approved = web3.utils.fromWei(res);
						           			approved = +approved;
						           			approved = parseFloat(approved).toFixed(2);

						           			if (+approved > +price) {

						           				console.log('redeeming NFT');

							                   		web3.eth.sendTransaction(
											          {from: selectedAccount,
											          to: farmAddress,
											          value: 0, 
											          gasprice: 100000, // 100000 = 10 gwei
											          // gas: 50000,   // gas limit
											          data: farmingcontract.methods.redeem(id).encodeABI()
											              }, function(err, transactionHash) {
											        	if (err) {
											         
												      	} else {
												      		nfttx = true;
												      		document.getElementById(""+id+"alert").style.display = 'none';
													        document.getElementById(""+id+"redeem").setAttribute("disabled","disabled");
													        document.getElementById(""+id+"purchase").setAttribute("disabled","disabled");
													        document.getElementById(""+id+"showLoading").style.display = 'block';  
													        
												      	}
												      })
												    .on('receipt', function(receipt){

												    	
												    	console.log(parseInt(receipt.logs[0].topics[3]));
											    		console.log(receipt.transactionHash);
												   
												    document.getElementById(""+id+"showLoading").style.display = 'none'; 
												    document.getElementById(""+id+"redeem").removeAttribute("disabled");
													document.getElementById(""+id+"purchase").removeAttribute("disabled");
												    							    
												    fetchAccountData();
												    loadgallery(false);

												    document.getElementById("ModalLabel1").innerHTML = '';
												    document.getElementById("ModalLabel1").innerText = 'Purchase Complete';
												    document.getElementById("ModalBody1").innerHTML = '';
												    document.getElementById("ModalBody1").innerHTML = '<div style="word-break:break-word">Your NFT has been minted at transaction hash <a href="https://ropsten.etherscan.io/tx/'+receipt.transactionHash+'" target="_blank">'+receipt.transactionHash+'</a>.<br><br>You can add your NFT to your mobile wallet (Metamask, Trustwallet) by clicking on "Collectibles" and pasting in the following information:<br><br>Contract: '+nftAddress+'<br><br>TokenID: '+parseInt(receipt.logs[0].topics[3])+'<br><br>Thank you for supporting the Dirty Finance project!</div>';
												    $('#Modal1').modal('show');

												    nfttx = false;

												    })

												    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

												    nfttx = false;
											   
												    document.getElementById(""+id+"showLoading").style.display = 'none'; 
						    
												    document.getElementById(""+id+"alert").style.display = 'block';
													document.getElementById(""+id+"alert").classList.add("alert-danger");  
													document.getElementById(""+id+"alert").classList.remove("alert-info"); 
												    document.getElementById(""+id+"alert").classList.remove("alert-success"); 

												    if (error.receipt === undefined) {
											    		document.getElementById(""+id+"alert").innerHTML = error.message;
												    } else {
												    	document.getElementById(""+id+"alert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
												    }
													}); // sendTransaction


						           			} else {

						           				//document.getElementById("dcapprove").style.display = 'block';
						           				document.getElementById(""+id+"alert").classList.add("alert-danger");  
												document.getElementById(""+id+"alert").classList.remove("alert-info"); 
											    document.getElementById(""+id+"alert").classList.remove("alert-success"); 
						                   		document.getElementById(""+id+"alert").style.display = 'block';
						                   		document.getElementById(""+id+"alert").innerHTML = "Please <a href='#' onclick='approveDC("+id+");return false;'>approve</a> your DirtyCash to be spent";


						           			}

						           		}
						           	 });




		                   		} else { // if (+balance > +price)


		                   		//not enough dirtycash
		                   		console.log('not enough dirtycash');
		                   		document.getElementById(""+id+"alert").classList.add("alert-danger");  
								document.getElementById(""+id+"alert").classList.remove("alert-info"); 
							    document.getElementById(""+id+"alert").classList.remove("alert-success"); 
		                   		document.getElementById(""+id+"alert").style.display = 'block';
		                   		document.getElementById(""+id+"alert").innerText = 'You do not have enough DirtyCash in your balance';

		                   		} // if (+balance > +price)
		                   }
 
		                }
		            });
		        }
		   });

		}

    });

}

async function purchaseNFT(id) {

	const web3 = new Web3(provider);
	const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    var tokencontract = new web3.eth.Contract(JSON.parse(dirtytokenABI),tokenAddress);
    var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
    var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);

    nftcontract.methods.getCreatorPrice(id).call(function(err,res){
		if(!err){

			farmingcontract.methods.getConversionPrice(res).call(function(err,res){
                if(!err){

                   //console.log(web3.utils.fromWei(res));
                   var price = web3.utils.fromWei(res);
					price = +price;

					console.log(price);

                    tokencontract.methods.balanceOf(selectedAccount).call(function(err,res){
		                if(!err){
		                   
		                	//console.log(web3.utils.fromWei(res));
		                   var balance = web3.utils.fromWei(res);
		                   balance = +balance;
		                   balance = parseFloat(balance).toFixed(2);

		                   //document.getElementById("dirtycash-balance").innerText = balance + " " + rewardTOkenSymbol;

		                   if (+balance > +price) { 

		                   		tokencontract.methods.allowance(selectedAccount, farmAddress).call(function(err,res){
						            	if(!err){

						            		var approved = web3.utils.fromWei(res);
						           			approved = +approved;
						           			approved = parseFloat(approved).toFixed(2);

						           			if (+approved > +price) {


						                   		console.log('purchasing NFT');

						                   		web3.eth.sendTransaction(
										          {from: selectedAccount,
										          to: farmAddress,
										          value: 0, 
										          gasprice: 100000, // 100000 = 10 gwei
										          // gas: 50000,   // gas limit
										          data: farmingcontract.methods.purchase(id).encodeABI()
										              }, function(err, transactionHash) {
										        	if (err) {
										         
											      	} else {
											      		nfttx = true;
											      		document.getElementById(""+id+"alert").style.display = 'none';
												        document.getElementById(""+id+"redeem").setAttribute("disabled","disabled");
												        document.getElementById(""+id+"purchase").setAttribute("disabled","disabled");
												        document.getElementById(""+id+"showLoading").style.display = 'block';  
												        
											      	}
											      })
											    .on('receipt', function(receipt){

											    	//console.log(receipt.logs[0].topics[3]);
											    	//console.log(receipt.transactionHash);
											   
											    document.getElementById(""+id+"showLoading").style.display = 'none'; 
											    document.getElementById(""+id+"redeem").removeAttribute("disabled");
												document.getElementById(""+id+"purchase").removeAttribute("disabled");
											    							    
											    fetchAccountData();
											    loadgallery(false);

											    document.getElementById("ModalLabel1").innerHTML = '';
											    document.getElementById("ModalLabel1").innerText = 'Purchase Complete';
											    document.getElementById("ModalBody1").innerHTML = '';
											    document.getElementById("ModalBody1").innerHTML = '<div style="word-break:break-word">Your NFT has been minted at transaction hash <a href="https://ropsten.etherscan.io/tx/'+receipt.transactionHash+'" target="_blank">'+receipt.transactionHash+'</a>.<br><br>You can add your NFT to your mobile wallet (Metamask, Trustwallet) by clicking on "Collectibles" and pasting in the following information:<br><br>Contract: '+nftAddress+'<br><br>TokenID: '+parseInt(receipt.logs[0].topics[3])+'<br><br>Thank you for supporting the Dirty Finance project!</div>';
											    $('#Modal1').modal('show');

											    nfttx = false;

											    })

											    .on('error', function(error){ // If a out of gas error, the second parameter is the receipt.

											    nfttx = false;
										   
											    document.getElementById(""+id+"showLoading").style.display = 'none'; 
					    
											    document.getElementById(""+id+"alert").style.display = 'block';
												document.getElementById(""+id+"alert").classList.add("alert-danger");  
												document.getElementById(""+id+"alert").classList.remove("alert-info"); 
											    document.getElementById(""+id+"alert").classList.remove("alert-success"); 

											    if (error.receipt === undefined) {
										    		document.getElementById(""+id+"alert").innerHTML = error.message;
											    } else {
											    	document.getElementById(""+id+"alert").innerHTML = "Transaction failed. Please check <a href='https://ropsten.etherscan.io/tx/"+error.receipt.transactionHash+"' target='_blank'>etherscan</a> for details.";									    	
											    }
												}); // sendTransaction

											} else {

												document.getElementById(""+id+"alert").classList.add("alert-danger");  
												document.getElementById(""+id+"alert").classList.remove("alert-info"); 
											    document.getElementById(""+id+"alert").classList.remove("alert-success"); 
						                   		document.getElementById(""+id+"alert").style.display = 'block';
						                   		document.getElementById(""+id+"alert").innerHTML = "Please <a href='#' onclick='approveDirty("+id+");return false;'>approve</a> your Dirty tokens to be spent";

											}

										}
								});
							}
						}

					});

				}

			});

		}

	});
}


function sortAll(selector) {

	//console.log('sorting called');

	var toSort = document.getElementById(selector).children;
	//console.log(toSort);
	toSort = Array.prototype.slice.call(toSort, 0);

	toSort.sort(function(a, b) {
	    var aord = +a.id.split('-')[1];
	    var bord = +b.id.split('-')[1];
	    // two elements never have the same ID hence this is sufficient:
	    return (aord > bord) ? 1 : -1;
	});

	var parent = document.getElementById(selector);
	parent.innerHTML = "";

	for(var i = 0, l = toSort.length; i < l; i++) {
	    parent.appendChild(toSort[i]);
	}

}

async function populateNFTOwnership() {

	//console.log('nft ownership function called');

    	const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();
	    selectedAccount = accounts[0];

		var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
		var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);

		nftcontract.methods.balanceOf(selectedAccount).call(function(err,res){
			if (!err) {

				if (+res > 0) {

					var nftbalance = +res;

					//console.log('this address owns '+nftbalance+' nfts');

					for(var i = 0; i <= nftbalance-1; i++) {

						nftcontract.methods.tokenOfOwnerByIndex(selectedAccount,i).call(function(err,res){
							if (!err) {

								var tokenid = res;

								//console.log('tokenID # '+tokenid);

								nftcontract.methods.tokenURI(tokenid).call(function(err,res){
									if (!err) {

										var nfturi = res;

										//console.log('uri is '+nfturi);

										nftcontract.methods.getIDbyURI(nfturi).call(function(err,res){
											if (!err) {

												var _id = res;

												//console.log('NFT ID is '+_id);

												document.getElementById(""+_id+"owned").style.display = 'block'; 
												
											}

										});


									}

								});

								

							}
						});

					}

				}
			}	
		});

}

async function populatenft(data, id, tokenuri, creatoraddress, minted, mintlimit, price, isredeemable, ispurchasable, withImages) {
    //console.log(data);
    if (data !== null) {
    	
    	const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();
	    selectedAccount = accounts[0];

		var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
		var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);

		var nftprice = web3.utils.toWei(price);
		//console.log(isredeemable);


		farmingcontract.methods.getConversionPrice(nftprice).call(function(err,res){
			if (!err) {

				var dirtyprice = web3.utils.fromWei(res).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				//console.log(dirtyprice);

				farmingcontract.methods.totalEarnedCreator(id).call(function(err,res){
					if (!err) {

						var totalCreator = res;

						farmingcontract.methods.totalEarnedBurn(id).call(function(err,res){
							if (!err) {

								var totalBurn = res;

								farmingcontract.methods.totalEarnedPool(id).call(function(err,res){
									if (!err) {

										var totalPool = res;

										//console.log(data.image)

								    	var attribstring = "";

								    	var tempdata = data.attributes[0].trait_type + ": " + data.attributes[0].value + "<BR>"; //collection
								    	tempdata +="NFT Name:" + data.name + "<BR>";
								    	tempdata += data.attributes[1].trait_type + ": " + data.attributes[1].value + "<BR>"; //rarity
								    	tempdata += data.attributes[2].trait_type + ": " + data.attributes[2].value + "<BR>"; //stars
								    	tempdata += data.attributes[3].trait_type + ": " + data.attributes[3].value + "<BR>"; //variant
									    tempdata += "<em>'"+data.description+"'</em><br>";
									    tempdata += "Linkspage: <a style='color:white' href='"+data.linkspage+"' target='_blank'>" + data.linkspage + "</a><BR>";
									    tempdata += "Contract: <span style='font-size: x-small;'>"+nftAddress+"</span><BR>";
									    tempdata += "<br>"
									    tempdata += "Total Minted So Far: <span id='"+id+"minted'>"+minted+"</span>/<span id='"+id+"mintlimit'>"+mintlimit+"</span><BR><br>";
									    
									   
									    
									    if (+minted == +mintlimit) {
								    		tempdata += "<div class='col-md-12'><button class='btn btn-danger disabled'>Mint Limit Reached</button></div>";
								    		tempdata += "<br>";

									    } else {


									    	if (!isredeemable) {
									    	
									    		tempdata += "<div class='col-md-12'><button class='btn btn-success disabled'>Not redeemable</button></div>";							    	
									    	} else {

									    		tempdata += "<div class='col-md-12'><button id='"+id+"redeem' class='btn btn-success' onclick=redeemNFT("+id+");>Reedeem for $"+price+" DirtyCash</button></div>";
									    	}

									    	 tempdata += "<img src='loading.svg' style='display:none;margin-top:10px' id='"+id+"showLoading' />";

									    	 tempdata += "<div class='col-md-12 alert alert-info' style='display:none;font-size: x-small;margin-top:10px;margin-bottom:0px;' id='"+id+"alert'></div>";

									    	 tempdata += "<br>";

									    	if (!ispurchasable) {

									    		tempdata += "<div class='col-md-12'><button id='"+id+"purchase' class='btn btn-default disabled'>Not purchasable</button></div>";	

									    	} else {

									    		tempdata += "<div class='col-md-12'><button id='"+id+"purchase' class='btn btn-default' onclick=purchaseNFT("+id+");>Purchase for "+dirtyprice+" Dirty</button></div>"
									    	
										    }	

										    tempdata += "<br>"
										}
									    tempdata += "Sharing Totals: <br>"
									    tempdata += "Total to creator: <span id='"+id+"totalcreator'>"+parseFloat(web3.utils.fromWei(totalCreator)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</span> Dirty Tokens<BR>";
									    tempdata += "Total to burn: <span id='"+id+"totalburn'>"+parseFloat(web3.utils.fromWei(totalBurn)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" </span> Dirty Tokens<BR>";
									    tempdata += "Total to pool: <span id='"+id+"totalpool'>"+parseFloat(web3.utils.fromWei(totalPool)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" </span> Dirty Tokens<BR>";
									    tempdata += "<br>"

									    if (withImages) {


										    var overlay_background = "background-color:rgba(199,21,133,.8);" //mediumvioletred default

									    	if (+data.attributes[2].value == 1) {
									    		overlay_background = "background-color:rgba(21,87,36,.8);" //green (common)
									    	} 

									    	if (+data.attributes[2].value == 2) {
									    		overlay_background = "background-color:rgba(0,64,133,.8);" //blue (uncommon)
									    	} 

									    	if (+data.attributes[2].value == 3) {
									    		overlay_background = "background-color:rgba(111,0,133,.8);" //purple (rare)
									    	} 

									    	if (+data.attributes[2].value == 4) {
									    		overlay_background = "background-color:rgba(224,248,77,.8);"//yellow (legendary)
									    	} 

									    	if (+data.attributes[2].value == 5) {
									    		overlay_background = "background-color:rgba(254,161,0,.8);"//orange (exotic)
									    	} 

									    	if (+data.attributes[2].value == 6) {
									    		overlay_background = "background-color:rgba(170,0,0,.8);"//red (god tier)
									    	} 

									    	if (data.width === undefined) {

									    		var nftwidth = "100%";

									    		var newoffset = "margin-left:.0rem";

									    	} else {

									    		var nftwidth = data.width;

									    		//console.log(nftwidth);

									    		var offset = nftwidth.replace(/\%/g,'');
									    		//console.log(offset);

									    		var leftoffset = 100 - +offset;
									    		leftoffset = leftoffset +2;

									    		//console.log(leftoffset);

									    		var newoffset = "margin-left:."+leftoffset+"rem";
									    	}

										   /* data.attributes.forEach(element => {

										    	attribstring += element.trait_type+": "+ element.value + "<BR>"

										    });*/

										    var theDiv = document.getElementById("galleryrow");			

										    if (document.getElementById(""+data.attributes[0].value+"-collection")) {

						                        console.log('collection exists');

						                        var collectionRow = document.getElementById(""+data.attributes[0].value+"-row");
						                        
						                    } else {
						                       
						                       console.log('collection is being created');

						                       var collectionNode = document.createElement('div');
						                        collectionNode.setAttribute('id', ""+data.attributes[0].value+"-collection");
						                        //collectionNode.setAttribute('onclick', '$("#'+data.attributes[0].value+'-row").toggle()');
						                        collectionNode.classList.add("col-md-12");
						                        collectionNode.classList.add("content-area");
						                        collectionNode.style.paddingLeft = '0px';
						                        collectionNode.style.paddingRight = '0px';
						                        theDiv.appendChild(collectionNode);
						                        collectionNode.innerHTML = "<div class='col-md-12' onclick=$('#"+data.attributes[0].value+"-row').slideToggle(750); style='cursor:pointer;background-image:url("+data.thumbnail+");background-repeat:no-repeat;background-attachment: fixed;background-size:cover;background-position:center;margin-left:0px;padding-left:0px;padding-right:0px;border-color: mediumvioletred;    border-style: solid;background-color: rgba(0,0,0,.8);border-radius: 28px;'><div style='backdrop-filter:grayscale(1)blur(4px);margin-left:0px;"+overlay_background+"' class='collection_overlay content-area' onmouseover=$(this).css('backdrop-filter','grayscale(0)blur(0px)'); onmouseout=$(this).css('backdrop-filter','grayscale(1)blur(4px)'); ><center><h1 class='monoton' style='color:white;margin-top:5%;margin-bottom:5%;'>The "+data.attributes[0].value+" Collection</h1><span><em>click to view</em></center><hr class='hz_div'></div></div>"
						                        var collectionRow = document.createElement('div');
						                        collectionRow.setAttribute('id', ""+data.attributes[0].value+"-row");
						                        collectionRow.classList.add("col-md-12");
						                        collectionRow.classList.add("row");
						                        collectionRow.style.display = 'none';
						                        collectionRow.style.marginLeft = '0px';
						                        collectionRow.style.paddingLeft = '0px';
						                        collectionRow.style.paddingRight = '0px';
						                        collectionNode.appendChild(collectionRow);
						                        
						                    }				    
										    
										    var newNode = document.createElement('div');
										    newNode.setAttribute('id',"div-"+id);
										    newNode.classList.add("col-md-4");
										    newNode.classList.add("nft-container");
										    newNode.style.paddingBottom = ("20px");
										    newNode.style.paddingTop = ("20px");
										    /*newNode.style.border = ("white");
										    newNode.style.borderStyle = ("solid");*/
										    //theDiv.insertChildAtIndex(newNode, id);
										    collectionRow.appendChild(newNode);

										    //console.log(data);
											newNode.innerHTML =  "<div class='overlay' style='"+overlay_background+";backdrop-filter:blur(4px);border-top-left-radius:25px;border-top-right-radius:25px;z-index:2;'><div id='"+id+"data' class='divtext col-md-12'>"+tempdata+"</div></div><div style='width:"+nftwidth+";"+newoffset+"'><img id='"+id+"owned' class='img-fluid' src='https://cash.dirty.finance/farming/images/in_collection.png' style='position:absolute;display:none;width:25%;z-index:1;'><video class='img-fluid' id='"+id+"vid' loop muted='muted' style='border:mediumvioletred;border-style:solid;' onmouseover=this.style.borderColor='white'; onmouseout=this.style.borderColor='mediumvioletred';><source src="+data.mp4+" type='video/mp4'>Your browser does not support the video tag.</video><button id='"+id+"play' class='btn btn-info' onclick=$('#"+id+"vid').get(0).play();$(this).hide();$('#"+id+"pause').show();>Animate</button><button style='display:none' id='"+id+"pause' class='btn btn-info' onclick=$('#"+id+"vid').get(0).pause();$(this).hide();$('#"+id+"play').show();>Pause</button><button class='btn btn-success pull-right' onclick=$('#div-"+id+"').children('.overlay').toggleClass('show');>NFT Info</button><img src='loading.svg' style='display:none' id='"+id+"btnload' /><div>"

										} else {
											document.getElementById(""+id+"data").innerHTML = '';
											document.getElementById(""+id+"data").innerHTML = tempdata;
										}
									}
								});

							}
						});

					}
				});

			}

		});
		

	} //if (data !== null)

}

   
function loadgallery(withImages) {

	if (withImages) {
		document.getElementById("galleryrow").innerHTML = "";
	}

	const web3 = new Web3(provider);
	/*const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];*/

	var farmingcontract = new web3.eth.Contract(JSON.parse(farmABI),farmAddress);
	var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);

	nftcontract.methods.getCurrentNFTID().call(function(err,res){
        if(!err){

        	var total = +res;
        	totalNFTExist = total;
          
          	if (+total > 0) {

          		for (let i=1;i<=+total;i++) {

          			nftcontract.methods.creatorInfo(i).call(function(err,res){

          				if (!err) { 
          					//console.log(res);
          					if (res.exists) {

          						//console.log(i);

          						var result = res;
          						var nftprice = web3.utils.fromWei(res.price);
          						/*console.log(res.creatorAddress); //
		                        console.log(res.creatorName); //
		                        console.log(res.exists); //+
		                        console.log(res.mintLimit); //+
		                        console.log(res.nftName); //
		                        console.log(res.price); //+
		                        console.log(res.redeemable); //+*/

		                        nftcontract.methods.mintedCountbyID(i).call(function(err,res){
		                        	if (!err) { 
		                        		var minted = res;

		                        		const getJSON = async url => {
				                        const response = await fetch(url); 

				                        return response.json(); // get JSON from the response 
				                        }

				                        
				                        	// console.log("Fetching data...");
				                        var data = getJSON(result.uri).then(data => populatenft(data, i, result.uri, result.creatorAddress, minted, result.mintLimit, nftprice, result.redeemable, result.purchasable, withImages));
					                    
				                    }
		                        });

		          				
	          				}
		          				
	          				
                     	}

          			});

          		} // for

          		window.setTimeout(function () {

          			document.getElementById("showLoading4").style.display = 'none'; 
          			document.getElementById("showLoading4").style.display = 'none'; 



          			//var sortlist = document.getElementById('galleryrow').children;
          			var sortlist = $("#galleryrow > div").map(function() {return this.id});
          			var divsortlist = sortlist.get().join(",");
          			console.log(divsortlist);
          			var rowlist;

          			var str_array = divsortlist.split(',');

					for(var i = 0; i < str_array.length; i++) {
          			console.log(i);

          				if (document.getElementById(""+str_array[i]+"").firstChild.nextSibling) {
          					rowlist = document.getElementById(""+str_array[i]+"").firstChild.nextSibling.id;
          					console.log(rowlist);
          					sortAll(rowlist);
          				}
          			
          			}	
          			/*sortlist.forEach((entry) => {
					    console.log(entry);
					    sortAll(entry);
					});*/
					
          			populateNFTOwnership();

          		}, 3000);
          		
          		

          	} else { 

          		document.getElementById("showLoading4").style.display = 'none'; 
          		document.getElementById("galleryresult").innerHTML = "<br><center>No NFT's found</center>";

          	} // if (+res > 0)
                               
            
        } // if(!err)
   });

}



function getTotalNFTExist() {

	console.log('checking for new NFT');

	const web3 = new Web3(provider);
	/*const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];*/

	var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),nftAddress);

	nftcontract.methods.getCurrentNFTID().call(function(err,res){
        if(!err){

        	if (+res > +totalNFTExist) {

        		document.getElementById("reloadgallery").style.display = 'block';
        		
        	}


        }

    });

}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#prepare").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData();
  document.querySelector("#btn-connect").removeAttribute("disabled")
  Refresh(30000);
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
  	window.location.reload(false); 
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
  	window.location.reload(false); 
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
  	window.location.reload(false); 
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

	
  window.clearInterval(stakinginterval);
	

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#btn-connect").style.display = "block";
  document.querySelector("#btn-disconnect").style.display = "none";
  document.querySelector("#disconnected").style.display = "block";
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#incorrectnetwork").style.display = "none";

  
}

function Refresh(interval) {
stakinginterval = window.setInterval(function() {
fetchAccountData();
getTotalNFTExist();
console.log('updating account data')
},interval);
}

function RefreshNFT(interval) {
nftinterval = window.setInterval(function() {

	if (!nfttx) {
		loadgallery(false);
		console.log('updating nft gallery data');
	}


},interval);
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
  
});
