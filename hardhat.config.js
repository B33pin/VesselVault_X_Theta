require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Replace with your actual private key


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    privatenet: {
      url: "http://localhost:18653", // Replace with your actual RPC URL if it's different
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 360777, // Replace with your actual subchain ID if it's different
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
    },
  },
};
