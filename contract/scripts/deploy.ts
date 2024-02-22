import { ethers } from "hardhat";

async function main() {

  const vestingContract = await ethers.deployContract("VestingContract");

  await vestingContract.waitForDeployment();

  console.log(
    `This contract has been deployed to ${vestingContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
