# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
# VesselVault_X_Theta

# Project Test Build Demo for VesselVault

Follow these steps to set up a test build for VesselVault:

## Step 1: Set Up Private Net

Before anything else, you need to establish your private net. This network will serve as the testing environment for your VesselVault instance.

## Step 2: Change RPC URL and Chain ID

Once your private net is up and running, modify the RPC URL and Chain ID in your configuration to match the details of your private net.

## Step 3: Compile the Smart Contract

The next step is to compile the `bloodDonation.sol` smart contract. This contract will govern the interactions within VesselVault.

## Step 4: Update Environment Variables

After compiling the smart contract, you'll have access to its ABI (Application Binary Interface) and the address at which it's deployed. Copy these details and replace the corresponding entries in your `.env` file and `abi` directory.

Now, your VesselVault test build is ready for demoing!
