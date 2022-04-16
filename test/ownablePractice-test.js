const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OwnablePractice", function () {

    beforeEach(async function () {
        [this.martin, this.juan] = await hre.ethers.getSigners();
        this.Ownable = await hre.ethers.getContractFactory("OwnablePractice");
        this.ownable = await this.Ownable.deploy(this.juan.address);
        await this.ownable.deployed();
    })

    it("Tenga owner correcto", async function () {
        const owner = await this.ownable.owner();
        expect(owner).to.equal(this.juan.address);
    });

    it("Solo el owner pueda transferir ownership", async function () {
        await expect(this.ownable.transferOwnership(this.martin.address))
        .to.be.revertedWith("No es el owner");
    });

    it("Emita evento de OwnershipTransferred", async function () {
        await expect(this.ownable.connect(this.juan).transferOwnership(this.martin.address))
        .to.emit(this.ownable, "OwnershipTransferred")
        .withArgs(this.juan.address, this.martin.address);
    });
})