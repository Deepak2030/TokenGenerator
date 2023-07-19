const { ethers } = require("hardhat");

async function main() {
  const TokenGenerator = await ethers.getContractFactory("TokenGenerator");
  const name = "CryptoCoin";
  const symbol = "CC";
  const decimals = 18; 
  const totalSupply = ethers.parseEther("21000000"); 

  const tokenGenerator = await TokenGenerator.deploy(name, symbol, decimals, totalSupply);
  await tokenGenerator.deployed();

  console.log("TokenGenerator deployed to:", tokenGenerator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });