import { ethers } from "hardhat";

async function main() {

  const storage = await ethers.deployContract("Storage");

  await storage.waitForDeployment();

  console.log(
    `This contract has been deployed to ${storage.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
