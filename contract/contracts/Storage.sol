// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

contract Storage {
    uint storedNumber;

    function writeNum(uint _num) public {
        storedNumber = _num;
    }

    function readNum() public view returns(uint){
        return storedNumber;
    }

    function deleteNum() public {
        delete storedNumber;
    }

}
