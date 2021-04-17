const DirtyFinance = artifacts.require("./DirtyFinance.sol");

module.exports = async function(deployer, network, accounts)  {

  if (network.startsWith("kovan") || network.startsWith("live")) {

  const myfunc = (event) => {

    event.setBurnAddress(                                                   //set burn address
     "0x000000000000000000000000000000000000dEaD"
   );

      event.excludeFromRewards(                                               //so burn address doesn't get 2% also for being a holder
      "0x000000000000000000000000000000000000dEaD"                                                              
    );  


 }

 var deploydirty = await deployer.deploy(DirtyFinance, "0x49AEaDDc7890FEeC5b84B9fe62BFf6A3b0575174").then(myfunc); //charity address is set here

  } else {
    console.log(('Failed to deploy contract, wrong network'))
  }

}
  
  


     

        
        
        
        
        
     