// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VestingContract is Ownable {

    struct Organization {
        string name;
        string symbol;
        address token;
        mapping(address => bool) whitelisted;
        mapping(address => string) stakeholderTypes;
        mapping(address => VestingSchedule[]) vestingSchedules;
    }

    struct VestingSchedule {
        uint256 releaseTime;
        uint256 amount;
        bool claimed;
    }

    mapping(address => Organization) public organizations;

    event OrganizationRegistered(address indexed orgAddress, string name, string symbol, address token);
    event StakeholderWhitelisted(address indexed orgAddress, address indexed stakeholder, string stakeholderType);
    event TokensVested(address indexed orgAddress, address indexed stakeholder, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function registerOrganization(address orgAddress, string memory name, string memory symbol, address token) external onlyOwner {
        require(organizations[orgAddress].token == address(0), "Organization already registered");
        organizations[orgAddress].name = name;
        organizations[orgAddress].symbol = symbol;
        organizations[orgAddress].token = token;
        emit OrganizationRegistered(orgAddress, name, symbol, token);
}

    function whitelistStakeholder(address orgAddress, address stakeholder, string memory stakeholderType) external onlyOwner {
        Organization storage org = organizations[orgAddress];
        org.whitelisted[stakeholder] = true;
        org.stakeholderTypes[stakeholder] = stakeholderType;
        emit StakeholderWhitelisted(orgAddress, stakeholder, stakeholderType);
    }

    function addVestingSchedule(address orgAddress, address stakeholder, uint256 releaseTime, uint256 amount) external onlyOwner {
        Organization storage org = organizations[orgAddress];
        org.vestingSchedules[stakeholder].push(VestingSchedule(releaseTime, amount, false));
        emit TokensVested(orgAddress, stakeholder, amount);
}


    function claimTokens(address orgAddress) external {
        Organization storage org = organizations[orgAddress];
        VestingSchedule[] storage schedules = org.vestingSchedules[msg.sender];
        for (uint256 i = 0; i < schedules.length; i++) {
            if (schedules[i].releaseTime <= block.timestamp && !schedules[i].claimed) {
                schedules[i].claimed = true;
                // Transfer tokens to stakeholder
                emit TokensVested(orgAddress, msg.sender, schedules[i].amount);
            }
        }
    }
}
