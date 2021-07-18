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
var farmAddress = "0xD17f394c3903D2399485a2D888548D9E5FfF9cD2";
var farmABI = JSON.stringify([{"inputs":[{"internalType":"contract DirtyCash","name":"_dirty","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawRewardsOnly","type":"event"},{"inputs":[],"name":"DirtyCashAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NFTAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addedLpTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardLastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockRewardUpdateCycle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blocksPerDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"conversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dirtycash","outputs":[{"internalType":"contract DirtyCash","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableRewardWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"enableRewardWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getAccruedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"getConversionPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getConversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDirtyPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDirtyPerBlockUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getHolderRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getRunningDepositTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalPendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getTotalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxDirtyStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLPStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDirtyStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minLPStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accDirtyPerShare","type":"uint256"},{"internalType":"uint256","name":"runningTotal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"reduceDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescueETHFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardWithdrawalStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blockRewardPercentage","type":"uint256"}],"name":"setBlockRewardPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blockRewardUpdateCycle","type":"uint256"}],"name":"setBlockRewardUpdateCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blocksPerDay","type":"uint256"}],"name":"setBlocksPerDay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setConverstionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setDirtyCashAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setDirtyCashBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setDirtyStakingMinMax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setLPStakingMinMax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setNFTAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setUnstakeTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"timeToUnstake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedCreator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalEarnedPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20Tokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"unstakeTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updatePoolReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRewardsOnly","outputs":[],"stateMutability":"nonpayable","type":"function"}]);

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

var nftAddress = "0x765ECe702d4Db51F69987e040cF43A150f9adFd9";
var nftName = "DirtyNFT"
var nftSymbol = "XXXNFT"
var DirtyNFTABI = JSON.stringify([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_holder","type":"address"}],"name":"checkBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creatorInfo","outputs":[{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"string","name":"creatorName","type":"string"},{"internalType":"string","name":"nftName","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"creatorSplit","type":"uint256"},{"internalType":"uint256","name":"mintLimit","type":"uint256"},{"internalType":"bool","name":"redeemable","type":"bool"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAllNFTIDbyAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorMintLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorRedeemable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorSplit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getCreatorURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentNFTID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFarmingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"mintedCountbyID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintedCountbyURI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"remintInitial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescueETHFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"setCreatorAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"string","name":"_creatorName","type":"string"},{"internalType":"string","name":"_nftName","type":"string"},{"internalType":"string","name":"_URI","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_splitPercent","type":"uint256"},{"internalType":"uint256","name":"_mintLimit","type":"uint256"},{"internalType":"bool","name":"_redeemable","type":"bool"},{"internalType":"bool","name":"_mintInitial","type":"bool"}],"name":"setCreatorInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setFarmingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setNFTCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_split","type":"uint256"}],"name":"setNFTSplit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"setNFTUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_name","type":"string"}],"name":"setNFTcreatorName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"uint256","name":"_limit","type":"uint256"}],"name":"setNFTmintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"string","name":"_name","type":"string"}],"name":"setNFTname","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"},{"internalType":"bool","name":"_redeemable","type":"bool"}],"name":"setNFTredeemable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20Tokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]);

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

	 /*Dirty Staking*/

    tokencontract.methods.balanceOf(selectedAccount).call(function(err,res){
        if(!err){
           //console.log(web3.utils.fromWei(res));
           var balance = web3.utils.fromWei(res);
           balance = +balance;
           balance = parseFloat(balance).toFixed(2);
            
            document.getElementById("dirty-balance").innerText = balance + " " + tokenSymbol;

            farmingcontract.methods.userInfo('1',selectedAccount).call(function(err,res){
                if(!err){
                   
                   var mytotaldt = web3.utils.fromWei(res.amount);
                   mytotaldt = +mytotaldt;
                   mytotaldt = parseFloat(mytotaldt).toFixed(2);

                   //console.log(+mytotaldt);

                   document.getElementById("mystakeddirty").innerText = mytotaldt + " " + tokenSymbol;
                   

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
					                    	
	                
					                    	document.getElementById("mystakeddirty").innerText = mytotaldt + " " + tokenSymbol;
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

									                    document.getElementById("poolreward").innerText = myholderrewards + " " + tokenSymbol;

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
            
            document.getElementById("dirtylp-balance").innerText = balance + " " + uniLPTokenSymbol;

            farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
                if(!err){
                   
                   var mytotallp = web3.utils.fromWei(res.amount);
                   mytotallp = +mytotallp;
                   mytotallp = parseFloat(mytotallp).toFixed(2);

                   //console.log(+mytotallp);

                   document.getElementById("mystakedlp").innerText = mytotallp + " " + uniLPTokenSymbol;
                   

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
					                    	
	                
					                    	document.getElementById("mystakedlp").innerText = mytotallp + " " + uniLPTokenSymbol;
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
                    
                    document.getElementById("dirtycash-balance").innerText = balance + " " + rewardTOkenSymbol;
                }
   });

  farmingcontract.methods.getRunningDepositTotal('0').call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var totallp = web3.utils.fromWei(res);
                   totallp = +totallp;
                   totallp = parseFloat(totallp).toFixed(2);
                    
                    document.getElementById("totalstakedlp").innerText = totallp + " " + uniLPTokenSymbol;
                }
   });


  farmingcontract.methods.userInfo('0',selectedAccount).call(function(err,res){
                if(!err){
                  // console.log(res.amount);
                   var mytotallp = web3.utils.fromWei(res.amount);
                   mytotallp = +mytotallp;
                   mytotallp = parseFloat(mytotallp).toFixed(2);
                    
                    document.getElementById("mystakedlp").innerText = mytotallp + " " + uniLPTokenSymbol;
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
		                    
		                    document.getElementById("pendingstakerewards").innerText = mystdc + " " + rewardTOkenSymbol;

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
                    
                    document.getElementById("totalstakeddirty").innerText = totalstaked + " " + tokenSymbol;
                }
   });

  farmingcontract.methods.getAccruedRewards(selectedAccount).call(function(err,res){
                if(!err){
                   //console.log(web3.utils.fromWei(res));
                   var totalaccrued = web3.utils.fromWei(res);
                   totalaccrued = +totalaccrued;
                   totalaccrued = parseFloat(totalaccrued).toFixed(2);
                    
                    document.getElementById("dirtycash-unredeemed").innerText = totalaccrued + " " + rewardTOkenSymbol;

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
											document.getElementById("dcalert").classList.remove("alert-info"); 
								        	document.getElementById("dcalert").classList.remove("alert-success"); 
								        	document.getElementById("dcalert").classList.add("alert-danger"); 
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

  /**/


  // Display fully loaded UI for wallet data
  document.querySelector("#btn-connect").style.display = "none";
  document.querySelector("#btn-disconnect").style.display = "block";
}


/* Dirty Functions */

async function approveDirty() {

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
	      		document.getElementById("dirtyalert").style.display = 'block';
		        document.getElementById("dtapprove").setAttribute("disabled","disabled");
		        document.getElementById("showLoading2").style.display = 'block';  
		        approvedirtytx = true;
	      	}
	      })
	    .on('receipt', function(receipt){
	   
	    document.getElementById("showLoading2").style.display = 'none'; 
	    approvedirtytx = false;

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
		
	    approvedirtytx = false;
	    dirtyerror = true;

	    fetchAccountData();

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
		    document.getElementById("dcalert").style.display = 'none';
		    
		    withdrawdctx = false;
		    

		    fetchAccountData();
		}); // sendTransaction

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
  await fetchAccountData(provider);
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
  	document.getElementById("lpapprove").style.display = 'none';		
  	document.getElementById("lpalert").style.display = 'none';
  	document.getElementById("dirtyalert").style.display = 'none';
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
  	document.getElementById("lpapprove").style.display = 'none';		
  	document.getElementById("lpalert").style.display = 'none';
  	document.getElementById("dirtyalert").style.display = 'none';
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
  	document.getElementById("lpapprove").style.display = 'none';		
  	document.getElementById("lpalert").style.display = 'none';
  	document.getElementById("dirtyalert").style.display = 'none';
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

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
  var interval = window.setInterval(function() {
fetchAccountData();
console.log('updating')
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
