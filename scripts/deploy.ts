import { ethers } from "hardhat";

async function main() {
    const TestNFT = await ethers.getContractFactory("TestNFT");
    const testNft = await TestNFT.deploy();
    // TestToken
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy();
    // ERC6551Registry
    const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
    const registry = await ERC6551Registry.deploy();
    // ERC6551Account
    const ERC6551Account = await ethers.getContractFactory("ERC6551Account");
    const account = await ERC6551Account.deploy();

    await testNft.deployed();
    await testToken.deployed();
    await registry.deployed();
    await account.deployed();

    console.log("testNft -> ", testNft.address);
    console.log("testToken -> ", testToken.address);
    console.log("registry -> ", registry.address);
    console.log("account -> ", account.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
