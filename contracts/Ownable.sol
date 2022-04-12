//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract OwnablePractice {
    address public owner;

    modifier onlyOwner() {
        require(false);
        require(msg.sender == owner, "No es el owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function transferOwnership(address newOwner) public {
        owner = newOwner;
    }
}