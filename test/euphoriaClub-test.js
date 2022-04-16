const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EuphoriaClub", function () {

    let EuphoriaClub;
    let euphoriaClub;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // [martin, juan] = await hre.ethers.getSigners();
        [owner] = await ethers.getSigners();
        EuphoriaClub = await ethers.getContractFactory("EuphoriaClub");
        euphoriaClub = await EuphoriaClub.deploy();
        await euphoriaClub.deployed();
    })

    it("La presale no esté activa", async function () {
        const presaleActive = await euphoriaClub.presaleActive()
        // console.log("La presale está activa?", presaleActive)
        expect(presaleActive).to.equal(false);
    })

    it("La sale no esté activa", async function () {
        const saleActive = await euphoriaClub.saleActive()
        // console.log("La sale está activa?", saleActive)
        expect(saleActive).to.equal(false);
    })

    it("Se pueda mintear un NFT reservado", async function () {
        await euphoriaClub.mintReserved(5)
        const cantReservada = await euphoriaClub.reserved()
        console.log("La cantidad reservada restante es:", cantReservada)
        const cantRestante = await euphoriaClub.MAX_SUPPLY()
        console.log("La cantidad restante es:", cantRestante)
        const ownerBalance = await euphoriaClub.balanceOf(owner.address);
        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        console.log("el owner tiene:", ownerBalance)
    })

    // it("Should assign the total supply of tokens to the owner", async function () {
    //     const ownerBalance = await euphoriaClub.balanceOf(owner.address);
    //     // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    //     // console.log("el owner tiene:", ownerBalance)
    //   });

    it("Se active la presale", async function () {
        await euphoriaClub.setPresaleActive(true)
        const presaleActive = await euphoriaClub.presaleActive()
        expect(presaleActive).to.equal(true);
    })   

    it("Se pueda mintear en presale", async function () {
        await euphoriaClub.setPresaleActive(true)
        const presaleActive = await euphoriaClub.presaleActive()
        expect(presaleActive).to.equal(true);
        // console.log(transaction)
        await euphoriaClub.mintPresale(3, { value: ethers.utils.parseEther("0.03") })
        const alreadyMinted = await euphoriaClub.totalSupply();
        console.log("Hasta el momento se mintearon:", alreadyMinted);
        expect(alreadyMinted).to.be.below(await euphoriaClub.MAX_SUPPLY());
    })
})