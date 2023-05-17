require("@nomiclabs/hardhat-ethers");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    privatenet: {
      url: "http://127.0.0.1:19888/rpc", // Replace with your actual RPC URL if it's different
      accounts: [
      "1111111111111111111111111111111111111111111111111111111111111111",
      "2222222222222222222222222222222222222222222222222222222222222222",
      "3333333333333333333333333333333333333333333333333333333333333333",],
      chainId: 360777, // Replace with your actual subchain ID if it's different
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
    },
  },
};
