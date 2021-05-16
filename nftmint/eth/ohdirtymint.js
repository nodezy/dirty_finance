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
var NFTAddress =  "0x829143715E78681e38F26316D154608768F0366a";
var tokenAddress = "0x4faB740779C73aA3945a5CF6025bF1b0e7F6349C";
var tokenName = "Dirty";
var tokenSymbol = "DIRTY";
var nftSymbol = "DirtyNFT";
var dirtytokenABI = JSON.stringify([{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"holderTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"},{"internalType":"bool","name":"_deductTransferFee","type":"bool"}],"name":"rewardsFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_burnAddress","type":"address"}],"name":"setBurnAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_regenAddress","type":"address"}],"name":"setRegenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_holderTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_regenTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_burnTaxAlloc","type":"uint256"}],"name":"setTaxAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taxPercentage","type":"uint256"}],"name":"setTaxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"taxPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardAmount","type":"uint256"}],"name":"tokenWithRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalHolderFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRegenFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}])
var DirtyNFTABI = JSON.stringify([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"holder","type":"address"}],"name":"checkBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintLimitReached","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintedCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"mintedCountURI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintingWallet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}])
var cheerleader_original = "QmfCmSGoCwFh8kGuEUPZftJdy73gc1q8LQxS9cSHaS2Wca" //added
var cheerleader_neon = "QmQs7hjRX4SEthZ8qbrxpCibNmsEz6L5wdvyV5y5SY2A5A"  //added
var cheerleader_dirty = "QmZr25cscn9ZGY5Wm4dNWsSy21py8uqqq8VcccGNBHHzWU" //added
var beachbabe_original = "Qmckz9sVHB2LvSTupPuS1jJEvofm5BnJ8sozQNo9yCcdJU" //added
var beachbabe_neon = "QmWwPR3sxj1P33Zv54gdmYvnj9uu6Wssptp1ctq9qQDy6Q"  //added
var beachbabe_dirty = "QmPY6de7gUpzHNmtQVnFMLv7vqjmEjbjJJxGZnVMEu5DRx" //added
var temptation_original = "QmQJCidwYFM2e22tgUxEhRsTSnGrGvKdgV2BZsvYoZLDKi"
var IPFSURI = "https://cash.dirty.finance/nft/ohdirtypack/"



function randomize() {
                            //og cheerleader                                      //neon_cheerleader                                        //dirty_cheerleader                                    //og_beachbabe                                         //neon_beachbabe                                      //dirty_beachbabe                                   //dirty_temptation
const map = {"QmfCmSGoCwFh8kGuEUPZftJdy73gc1q8LQxS9cSHaS2Wca" : 25, "QmQs7hjRX4SEthZ8qbrxpCibNmsEz6L5wdvyV5y5SY2A5A" : 15, "QmZr25cscn9ZGY5Wm4dNWsSy21py8uqqq8VcccGNBHHzWU" : 14, "Qmckz9sVHB2LvSTupPuS1jJEvofm5BnJ8sozQNo9yCcdJU" : 20, "QmWwPR3sxj1P33Zv54gdmYvnj9uu6Wssptp1ctq9qQDy6Q" : 13, "QmPY6de7gUpzHNmtQVnFMLv7vqjmEjbjJJxGZnVMEu5DRx" : 9, "QmQJCidwYFM2e22tgUxEhRsTSnGrGvKdgV2BZsvYoZLDKi" : 4};
const keys = Object.keys(map);

var sorted_array = [];
var output_run = [];

keys.forEach(key=>{
  sorted_array = [...sorted_array,...((key+" ").repeat(map[key]).trim().split(" "))];
})

//console.log(sorted_array);

var i

//for (i = 0; i <  690; i++) {
  
let shuffled = sorted_array
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)

  //console.log(shuffled);

  //console.log(shuffled[69]);

  //output_run.push(shuffled[69])

  //}

  //var count = {};
  //output_run.forEach(function(i) { count[i] = (count[i]||0) + 1;});
  //console.log(count);

  //console.log(output_run)

  return shuffled[69]
}



//workflow
//get wallet address - done
//create nft contract instance
//create token contract instance - done
//check if amount of DIRTY in wallet
//check if NFT is in wallet
//if existing NFT, get json URI and display
//if amount of DIRTY is sufficient, check NFT contract to see if mint limit reached
//if so, deny, if not, allow mint
//refresh to show newly minted NFT

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
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  //console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  window.web3 = new Web3(ethereum);

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
          if (mydata[i].name == "Ethereum Mainnet") {
            document.getElementById("correctnetwork").style.display = 'block';
            document.getElementById("incorrectnetwork").style.display = 'none';
            document.getElementById("disconnected").style.display = 'none';


          } else {
            document.getElementById("correctnetwork").style.display = 'none';
            document.getElementById("incorrectnetwork").style.display = 'block';
          }
        }
      }
  
    }
  });

 
  //document.querySelector("#selected-account").textContent = selectedAccount;

  function isWeb3Connected(account) {
            if(window.ethereum) {
                web3.eth.getBalance(account, function(err, ethBalance) {
                  if(!err){

                // document.getElementById("web3-wallet").innerHTML = "<p style='color:green;display:inline-block'><b>Yes</b></p>";

                // Added by Andreas - moving connection status to #header
                document.getElementById("web3-wallet").innerHTML = "<div class='dot-container'><div class='dot green'></div></div>Web3 wallet: <strong>connected</strong>";

                document.getElementById("my-address").innerText = account;
                document.getElementById("my-eth-balance").innerText = web3.utils.fromWei(ethBalance) + " ETH";
              }
              });
              } else {
                web3.eth.getBalance(account, function(err, ethBalance) {
                  if(!err){

                //document.getElementById("web3-wallet").innerHTML = "<p style='color:green;display:inline-block'><b>Yes</b></p>";

                // Added by Andreas - moving connection status to #header
                document.getElementById("web3-wallet").innerHTML = "<div class='dot-container'><div class='dot green'></div></div>Web3 wallet: <strong>connected</strong>";

                document.getElementById("my-address").innerText = account;
                document.getElementById("my-eth-balance").innerText = web3.utils.fromWei(ethBalance) + " ETH";
              }
              });
            }
  }

  
   var tokencontract = new web3.eth.Contract(JSON.parse(dirtytokenABI),tokenAddress);

   var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),NFTAddress);

    function getAccountInfo(account) {

       tokencontract.methods.balanceOf(account).call(function(err,res){
                if(!err){
                   // console.log(web3.utils.fromWei(res));
                   var balance = web3.utils.fromWei(res);
                   balance = +balance;
                   balance = parseFloat(balance).toFixed(2);
                    
                    document.getElementById("my-token-balance").innerText = balance + " " + tokenSymbol;

                    if (+balance >= 100000000) {
                      //show mint on BSC button here
                      //set session variable that we have a 100M holder
                     // fetch("session.php?account="+account+"") //Nodezy: saving wallet address as a session variable
                      //document.getElementById("bsc-mint").style.display = "block";
                      //console.log('displaying alternative mint process');
                    } else {
                      //fetch("killsession.php") //Nodezy: saving wallet address as a session variable
                      //document.getElementById("bsc-mint").style.display = "none";
                    }
                }
              });
       nftcontract.methods.mintLimitReached().call(function(err,res){
              if(!err){
              if (res == true) {
                 //total # of NFT mints has been met
                   document.getElementById("mint-nft").setAttribute("disabled","disabled");
                   document.getElementById("validation").style.display = "block";
                  document.getElementById("validation").innerHTML = "<span style='color:red'><br>The 690 mint limit for this promotion has been reached</span>"
               } else {
       nftcontract.methods.mintingWallet(account).call(function(err,res){
          if(!err){
            if (res == true) {
                    //wallet has already minted 1 NFT
                   document.getElementById("mint-nft").setAttribute("disabled","disabled");
                     document.getElementById("validation").style.display = "block";
                    document.getElementById("validation").innerHTML = "<span style='color:red'><br>This wallet has already minted 1 promotional NFT on Ethereum chain</span>"
                  } else {
            tokencontract.methods.balanceOf(account).call(function(err,res){
                if(!err){
                   // console.log(web3.utils.fromWei(res));
                    
                   // document.getElementById("my-token-balance").innerText = web3.utils.fromWei(res) + " " + tokenSymbol;
                   // document.getElementById("token-name").innerText = tokenName + " (" + tokenSymbol + ")";

                   var holdings = web3.utils.fromWei(res);

                   if (+holdings >= 100000000) {
                    document.getElementById("mint-nft").removeAttribute("disabled");
                    document.getElementById("validation").style.display = "none";
                   } else {
                    document.getElementById("mint-nft").setAttribute("disabled","disabled");
                     document.getElementById("validation").style.display = "block";
                    document.getElementById("validation").innerHTML = "<span style='color:red'><br>You do not have the required amount of 100M $Dirty to mint the promotional NFT</span>"
                   }
                  // console.log(web3.utils.fromWei(res));

                } else {
                    //console.log(err);
                }
              
            });//balanceOf();
          }
          } else {
            //console.log(err);
          }
          });//mintWallet();
            }
          }
          });//mintLimitReached();
          
        }

         // Get list of accounts of the connected wallet
    
    function savenftcount(amount) {
    var numNFT = amount;
    //console.log(numNFT);
   }

   function populatenft(data, tokenid, tokenuri) {
    //console.log(data.name);
    if (data !== null) {

    	var attribstring = "";
    
    document.getElementById("my-nft-img").innerHTML = "<img src="+data.image+" width='100%'>";
    document.getElementById("my-nft-name").innerText = data.name;
    document.getElementById("my-nft-desc").innerHTML = "<em>'"+data.description+"'</em>";

    data.attributes.forEach(element => {

    	attribstring += element.trait_type+": "+ element.value + "<BR>"


    });

    attribstring += "TokenID: "+tokenid +"<br>"+"Contract: "+NFTAddress

    document.getElementById("my-nft-attr").innerHTML = attribstring;


    document.getElementById("my-nft-uri").innerText = tokenuri;

    var ocuri = IPFSURI + cheerleader_original;
    var ncuri = IPFSURI + cheerleader_neon;
    var dcuri = IPFSURI + cheerleader_dirty;
    var oburi = IPFSURI + beachbabe_original;
    var nburi = IPFSURI + beachbabe_neon;
    var dburi = IPFSURI + beachbabe_dirty;
    var dturi = IPFSURI + temptation_original;

    //console.log(tokenuri)

    if (tokenuri == ocuri) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_ogcheer.png' width='100%'>";
    }

    if (tokenuri == ncuri) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_neoncheer.png' width='100%'>";
    }

    if (tokenuri == dcuri) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_dirtycheer.png' width='100%'>";
    }

    if (tokenuri == oburi) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_ogbeach.png' width='100%'>";
    }

    if (tokenuri == nburi) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_neonbeach.png' width='100%'>";
    }

    if (tokenuri == dburi) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_dirtybeach.png' width='100%'>";
    }

    if (tokenuri == dturi) {
      document.getElementById("showshare").style.display = "block";
      document.getElementById("shareimg").innerHTML = "<br><img class='img-fluid shadow' src='images/minted_temptation.png' width='100%'>";
    }



      }
   }

        
    function getNFTInfo(account) {
            nftcontract.methods.balanceOf(account).call(function(err,res){
                if(!err){
                   // console.log(web3.utils.fromWei(res));
                    
                    document.getElementById("my-nft-balance").innerText = res + " " + nftSymbol;
                   // document.getElementById("token-name").innerText = tokenName + " (" + tokenSymbol + ")";
                   var nfttotal = res; //if > 1 put into array
                   if (+res > 0) {
                    //console.log("should display")
                    document.getElementById("my-dirty-collection").style.display = "block";
                    document.getElementById("no-dirty-collection").style.display = "none";

                    //for each
           			 nftcontract.methods.tokenOfOwnerByIndex(account,0).call(function(err,res){
                if(!err){
                   // console.log(web3.utils.fromWei(res));   tokenURI
                    
                   // document.getElementById("my-nft-balance").innerText = res + " " + nftSymbol;
                   // document.getElementById("token-name").innerText = tokenName + " (" + tokenSymbol + ")";
                   var nftTokenID = res;
                   //console.log(nftTokenID);
                   nftcontract.methods.tokenURI(nftTokenID).call(function(err,res){
                      if(!err){
                         // console.log(web3.utils.fromWei(res));   tokenURI
                          
                         
                         // document.getElementById("token-name").innerText = tokenName + " (" + tokenSymbol + ")";
                         var nftTokenURI = res;
                        
                         
                         //console.log(nftTokenURI);

                        
                         const getJSON = async url => {
                          const response = await fetch(url); 

                          return response.json(); // get JSON from the response 
                        }

                       // console.log("Fetching data...");
                         var data = getJSON(nftTokenURI)
                          .then(data => populatenft(data, nftTokenID, nftTokenURI));

                          

                      } else {
                          //console.log(err);
                      }
              
                    });


                } else {
                    //console.log(err);
                }
              
            });
            //end for
                   } else {
                   	//no NFT in account, destroy any HTML holding old NFT data
                   	document.getElementById("my-dirty-collection").style.display = "none";
                    document.getElementById("no-dirty-collection").style.display = "block";
                    document.getElementById("my-nft-uri").innerText = "";
                    document.getElementById("my-nft-img").innerHTML = "";
    				document.getElementById("my-nft-name").innerText = "";
    				document.getElementById("my-nft-desc").innerHTML = "";


                   }

                } else {
                    //console.log(err);
                }
              
            }); //balanceOf()

            
          
        }

         // Get list of accounts of the connected wallet
  try {
            await ethereum.enable();
            var account = await web3.eth.getAccounts();
            //console.log(account[0]);
           selectedAccount = account;
         

    }catch{
      //console.log(err);
    } finally {
            getAccountInfo(account[0]);
            isWeb3Connected(account[0]);
            getNFTInfo(account[0], IPFSURI);
    }

  

  function getNFTCounts() {

    var ocuri = IPFSURI + cheerleader_original;
    var ncuri = IPFSURI + cheerleader_neon;
    var dcuri = IPFSURI + cheerleader_dirty;
    var oburi = IPFSURI + beachbabe_original;
    var nburi = IPFSURI + beachbabe_neon;
    var dburi = IPFSURI + beachbabe_dirty;
    var dturi = IPFSURI + temptation_original;

    nftcontract.methods.totalMinted().call(function(err,res){

      if(!err){
        document.getElementById("tmresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(dturi).call(function(err,res){

      if(!err){
        document.getElementById("dtresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(dcuri).call(function(err,res){

      if(!err){
        document.getElementById("dcresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(dburi).call(function(err,res){

      if(!err){
        document.getElementById("dbbresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(ncuri).call(function(err,res){

      if(!err){
        document.getElementById("ncresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(nburi).call(function(err,res){

      if(!err){
        res = +res + 1
        document.getElementById("nbbresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(ocuri).call(function(err,res){

      if(!err){
        document.getElementById("ocresults").innerHTML = " " +res;
      }
    });

    nftcontract.methods.mintedCount(oburi).call(function(err,res){

      if(!err){
        document.getElementById("obbresults").innerHTML = " " +res;
      }
    });

  }

  getNFTCounts();


  // Get a handl
 /* const template = document.querySelector("#template-balance");
  const accountContainer = document.querySelector("#accounts");

  // Purge UI elements any previously loaded accounts
  accountContainer.innerHTML = '';

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Fill in the templated row and put in the document
    const clone = template.content.cloneNode(true);
    clone.querySelector(".address").textContent = address;
    clone.querySelector(".balance").textContent = humanFriendlyBalance;
    accountContainer.appendChild(clone);
  });*/

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  //await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#btn-connect").style.display = "none";
  document.querySelector("#btn-disconnect").style.display = "block";
}


  async function mintNFT() {

   
     window.web3 = new Web3(ethereum);

     // Get list of accounts of the connected wallet
     try {
              await ethereum.enable();
              var account = await web3.eth.getAccounts();
      } catch {
        //console.log(err);
      }

  
  var nftcontract = new web3.eth.Contract(JSON.parse(DirtyNFTABI),NFTAddress);
  var tokenURI = IPFSURI + randomize() //randomized
     
    web3.eth.sendTransaction(
          {from: account[0],
          to: NFTAddress,
          value: 0, 
          gasprice: 100000, // 100000 = 10 gwei
           gas: 400000,   // gas limit
          data: nftcontract.methods.mintNFT(account[0], tokenURI).encodeABI()
              }, function(err, transactionHash) {
        if (err) {
         /* document.getElementById("troubleshooting").style.display = 'none';
          document.getElementById("buyTokens").style.display = 'block';
        document.getElementById("buyTokens").innerHTML =  "Status: " + err["message"];*/
      } else {
        document.getElementById("mint-nft").setAttribute("disabled","disabled");
        document.getElementById("ohdirtypack").style.display = 'block';
        window.setTimeout(function (){
          document.getElementById("unopened").style.display = 'none';
          document.getElementById("opened").style.display = 'block';
          //document.getElementById("opened").style.transform = 'scale(1.10, 1.10)';
          var audio = new Audio('sounds/rip.mp3');
          audio.play();
        },1500);
         document.getElementById("submitted").style.display = 'block';
         document.getElementById("approved").style.display = 'none';
         document.getElementById("nft-tx").style.display = 'block';
        document.getElementById("nft-tx").innerHTML = "TX: <a href='https://etherscan.io/tx/"+ transactionHash+"' target='_blank'>"+transactionHash+"</a>";
        document.getElementById("showLoading").style.display = 'block';  

        window.setTimeout(function () {
          document.getElementById("ohdirtypack").style.display = 'none';

        }, 4000);
        //window.scrollTo(0,document.body.scrollHeight);
        //console.log(transactionHash);
      }
      })
    .on('receipt', function(receipt){
    /*window.clearTimeout(clearbuy);*/

    document.getElementById("submitted").style.display = 'none'; 
     document.getElementById("approved").style.display = 'block';
    document.getElementById("showLoading").style.display = 'none'; 
    document.getElementById("unopened").style.display = 'block';
    document.getElementById("opened").style.display = 'none';
    document.getElementById("minted").scrollIntoView();

    fetchAccountData();
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

  Refresh(5000);
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  window.web3 = new Web3(ethereum);

  
  // Subscribe to accounts change
  ethereum.on("accountsChanged", (accounts) => {
    if (selectedAccount != null) {                 //this is so even after wallet is disconnected, metamask can still reload the site because
    fetchAccountData();                    //the ethereum.on event listener is still active and cannot be deactivated...so we just check
    } else {                              //and if the account is null we reload the page instead of letting metamask call the accountData function
      window.location.reload();
    }
  });

  // Subscribe to chainId change
  ethereum.on("chainChanged", (chainId) => {
    if (selectedAccount != null) {
    fetchAccountData();
    } else {
      window.location.reload();
    }
  }); 

  // Subscribe to networkId change
  ethereum.on("networkChanged", (networkId) => {
    if (selectedAccount != null) {
    fetchAccountData();
    } else {
      window.location.reload();
    }
  });

  await refreshAccountData();
}




/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
  console.log("Killing the wallet connection", window.web3);

  // TODO: Which providers have close method?
  /*if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }*/

  window.web3 = null;

  // Set the UI back to the initial state
  document.querySelector("#btn-connect").style.display = "block";
  document.querySelector("#btn-disconnect").style.display = "none";
  document.querySelector("#disconnected").style.display = "block";
  document.querySelector("#connected").style.display = "none";

  document.getElementById("web3-wallet").innerHTML = "<div class='dot-container'><div class='dot red'></div></div>Web3 wallet: <strong>not connected</strong>";  

}

function getDisconnect() {

  
if (confirm("Are you sure you want to disconnect?") == true) {
  //console.log('Disconnect called');
    onDisconnect();
    //return true;
  } else {
    return false;
  }

  
}

function Refresh(interval) {
  var interval = window.setInterval(function() {
fetchAccountData();
console.log('refresh')
},interval);
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  //init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", getDisconnect);

});
