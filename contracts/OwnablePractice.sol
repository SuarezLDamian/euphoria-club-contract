//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract OwnablePractice {
    
    address public owner;
    
    constructor(address _owner) {
        owner = _owner;
    }    

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "No es el owner");
        _;
    }    

    function transferOwnership(address newOwner) onlyOwner public {
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
}