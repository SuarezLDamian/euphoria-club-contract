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
  const Ownable = await hre.ethers.getContractFactory("OwnablePractice");
  const ownable = await Ownable.deploy(martin.address);

  await ownable.deployed();

  console.log("Ownable deployed to:", ownable.address);
  const foo = await ownable.owner();
  console.log("El owner es:", foo)

  await ownable.transferOwnership(juan.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
