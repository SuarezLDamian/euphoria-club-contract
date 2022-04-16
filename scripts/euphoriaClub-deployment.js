// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [martin, juan] = await hre.ethers.getSigners();

  // We get the contract to deploy
  const EuphoriaClub = await hre.ethers.getContractFactory("EuphoriaClub");
  const euphoriaClub = await EuphoriaClub.deploy();

  await euphoriaClub.deployed();

  console.log("euphoriaClub deployed to:", euphoriaClub.address);
  
//   await euphoriaClub.setSaleActive(true)
//   const foo = await euphoriaClub.saleActive()
//   console.log("Venta activa?", foo)

//   await euphoriaClub.setSaleActive(false)
//   const foos = await euphoriaClub.saleActive()
//   console.log("Venta activa?", foos)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
