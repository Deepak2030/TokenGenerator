const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TokenGenerator", () => {
  let TokenGenerator;
  let tokenInstance;
  let owner, alice, bob;

  beforeEach(async () => {
    TokenGenerator = await ethers.getContractFactory("TokenGenerator");
    [owner, alice, bob] = await ethers.getSigners();

    tokenInstance = await TokenGenerator.deploy("MyToken", "MTK", 18, ethers.utils.parseEther("1000"));
    await tokenInstance.deployed();
  });

  it("should have correct initial values", async () => {
    expect(await tokenInstance.i_name()).to.equal("MyToken");
    expect(await tokenInstance.i_symbol()).to.equal("MTK");
    expect(await tokenInstance.i_decimals()).to.equal(18);
    expect(await tokenInstance.totalSupply()).to.equal(ethers.utils.parseEther("1000"));
  });

  it("should transfer tokens between accounts", async () => {
    const amountToTransfer = ethers.utils.parseEther("100").toString();

    await tokenInstance.transfer(alice.address, amountToTransfer);
    const ownerBalance = await tokenInstance.balanceOf(owner.address);
    const aliceBalance = await tokenInstance.balanceOf(alice.address);

    expect(ownerBalance).to.equal(ethers.utils.parseEther("900"));
    expect(aliceBalance).to.equal(ethers.utils.parseEther("100"));
  });

  it("should approve and transferFrom tokens", async () => {
    const amountToTransfer = ethers.utils.parseEther("50");

    await tokenInstance.connect(owner).approve(bob.address, amountToTransfer);
    await tokenInstance.connect(bob).transferFrom(owner.address, alice.address, amountToTransfer);

    const ownerBalance = await tokenInstance.balanceOf(owner.address);
    const aliceBalance = await tokenInstance.balanceOf(alice.address);
    const bobAllowance = await tokenInstance.allowance(owner.address, bob.address);

    expect(ownerBalance).to.equal(ethers.utils.parseEther("950"));
    expect(aliceBalance).to.equal(ethers.utils.parseEther("50"));
    expect(bobAllowance).to.equal(0);
  });
});
