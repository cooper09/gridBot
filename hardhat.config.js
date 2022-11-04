// required hardhat plugins
// npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
//
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.12",
        settings: {},
      },
      {
        version: "0.8.0"
      }
    ]
  },

  paths: {
    contracts: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {

    hardhatfork: {
        chainId: 31337,
        //url: "https://mainnet.infura.io/v3/",
        url: "localhost:8545",
      },
    mainnet: {
        chainId: 1,
        url: "https://mainnet.infura.io/v3/2", // or any other JSON-RPC provider
        accounts: [""]
      },
      matic: {
        url: 'https://polygon-mainnet.g.alchemy.com/v2/',
        accounts: [''],
      }
    }
};

