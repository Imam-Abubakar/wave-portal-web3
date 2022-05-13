const main = async () => {
    /*This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.*/
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
   /*What's happening here is Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.*/
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    /*We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.*/
    await waveContract.deployed();
    /*Finally, once it's deployed waveContract.address  will basically give us the address of the deployed contract. This address is how we can actually find our contract on the blockchain. */
    console.log("Contract addy:", waveContract.address);



  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );


    /*
    Basically, we need to manually call our functions! Just like we would any normal API. First I call the function to grab the # of total waves. Then, I do the wave. Finally, I grab the waveCount one more time to see if it changed.
    */
    let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

   /**
   * Let's send a few waves!
   */
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait(); // Wait for the transaction to be mined
  
   /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  
  
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();

  /*
  In these code blocks you will constantly notice that we use hre.ethers, but hre is never imported anywhere? What type of magic trick is this?

Directly from the Hardhat docs themselves you will notice this:

The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task, test or script. In reality, Hardhat is the HRE.

So what does this mean? Well, every time you run a terminal command that starts with npx hardhat you are getting this hre object built on the fly using the hardhat.config.js specified in your code! This means you will never have to actually do some sort of import into your files like:

========
You can also see that wallet address that waved equaled to the address that deployed the contract. I waved at myself!

So we:
1. Called our wave function.
2. Changed the state variable.
3. Read the new value of the variable.

This is pretty much the basis of most smart contracts. Read functions. Write functions. And changing a state variable. We have the building blocks we need now to keep on working on our epic WavePortal.
*/