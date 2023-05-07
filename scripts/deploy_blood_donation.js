const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the BloodDonation contract with the account:", deployer.address);

  const BloodDonation = await ethers.getContractFactory("BloodDonation");
  const bloodDonation = await BloodDonation.deploy();

  console.log("BloodDonation contract deployed to:", bloodDonation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
