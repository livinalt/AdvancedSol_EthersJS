import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

describe("VestingContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployVestingContract() {

    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(owner.address);
   
    return { vestingContract, owner };
  }

  it("Should register organization", async function () {
    // Register an organization
    const [owner, addr1, addr2] = await ethers.getSigners();

    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(owner.address);
    await vestingContract.registerOrganization("Org1", "ORG", owner.address);

    // Retrieve registered organization
    const org = await vestingContract.registeredOrganizations(0);

    // Verify the organization details
    expect(org.name).to.equal("Org1");
    expect(org.symbol).to.equal("ORG");
    expect(org.tokenAddress).to.equal(owner.address);
  });

  it("Should add stakeholder", async function () {
    // Add a stakeholder
    const [owner, addr1, addr2] = await ethers.getSigners();

    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(owner.address);
    await vestingContract.registerOrganization("Org1", "ORG", owner.address);

    // Retrieve registered organization
    const org = await vestingContract.registeredOrganizations(0);
    await vestingContract.addStakeholder(owner.address, 0, 1000, 3600); // Assume 1 hour vesting period

    // Retrieve added stakeholder
    const stakeholder = await vestingContract.stakeholders(0);

    // Verify the stakeholder details
    expect(stakeholder.stakeholderAddress).to.equal(owner.address);
    expect(stakeholder.value).to.equal(1000);
    // You can add more assertions here for other properties
  });

  it("Should whitelist stakeholder", async function () {
    // Whitelist a stakeholder

    const [owner, addr1, addr2] = await ethers.getSigners();

    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(owner.address);
    await vestingContract.registerOrganization("Org1", "ORG", owner.address);

    // Retrieve registered organization
    const org = await vestingContract.registeredOrganizations(0);
    await vestingContract.whitelistStakeholder(owner.address);

    // Check if the stakeholder is whitelisted
    const isWhitelisted = await vestingContract.isWhitelisted(owner.address);
    expect(isWhitelisted).to.be.true;
  });

  /* it("Should allow stakeholder to claim tokens after vesting period", async function () {
    // Add a stakeholder with a vesting period

    const [owner, addr1, addr2] = await ethers.getSigners();

    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(owner.address);
    await vestingContract.registerOrganization("Org1", "ORG", owner.address);

    // Retrieve registered organization
    const org = await vestingContract.registeredOrganizations(0);
    await vestingContract.addStakeholder(owner.address, 0, 1000, 3600); // Assume 1 hour vesting period

    // Fast-forward time by 1 hour
    await time.increase(3600);

    // Claim tokens
    await vestingContract.connect(owner).claimTokens();

    // Check if tokens are transferred to the stakeholder
    const stakeholderBalance = await token.balanceOf(owner.address);
    expect(stakeholderBalance).to.equal(1000);
  }); */
});
