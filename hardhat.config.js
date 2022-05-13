require("@nomiclabs/hardhat-waffle");
// Import and configure dotenv
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      // This value will be replaced on runtime
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

/*
Deploying contracts with account:  0x3062ad7e484C0bCa88cbE1F0B939Efa4738bf5dA
Account balance:  172551717376371652
WavePortal address:  0x36bb80a303CF7884B5CdC907fa9c07229D284aFc
*/