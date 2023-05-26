import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const METADATA_URL =
    "https://bafkreigkjshsnzrgc3bgzaauxmqz2k3ptw5biumssph6y3fddl4bh24toi.ipfs.nftstorage.link/";

describe("ERC-6551", function () {
    async function setup() {
        // account
        const [owner, otherAccount] = await ethers.getSigners();
        // TestNFT
        const TestNFT = await ethers.getContractFactory("TestNFT");
        const testNft = await TestNFT.deploy();
        // TestToken
        const TestToken = await ethers.getContractFactory("TestToken");
        const testToken = await TestToken.deploy();
        // ERC6551Registry
        const ERC6551Registry = await ethers.getContractFactory(
            "ERC6551Registry"
        );
        const registry = await ERC6551Registry.deploy();
        // ERC6551Account
        const ERC6551Account = await ethers.getContractFactory(
            "ERC6551Account"
        );
        const account = await ERC6551Account.deploy();

        return {
            owner,
            otherAccount,
            testNft,
            testToken,
            registry,
            account,
        };
    }

    describe("Test Tokens", function () {
        it("Should deploy testToken successfuly", async function () {
            const { owner, otherAccount, testToken } = await loadFixture(setup);

            expect(await testToken.balanceOf(owner.address)).to.not.equal(0); // owner has 1000 TestToken
            expect(await testToken.balanceOf(otherAccount.address)).to.equal(0);
        });

        it("Should mint testNFT successfuly", async function () {
            const { owner, testNft } = await loadFixture(setup);
            await testNft.safeMint(owner.address, METADATA_URL);
            expect(await testNft.balanceOf(owner.address)).to.equal(1);
        });
    });

    describe("Registry", function () {
        it("Should create TokenBoundAccount successfuly", async function () {
            const { owner, otherAccount, testNft, registry, account } =
                await loadFixture(setup);

            await testNft.safeMint(owner.address, METADATA_URL);

            const newAccount = await registry
                .connect(owner)
                .callStatic.createAccount(
                    account.address, // implementation contract
                    43113, // avalanche testnet
                    testNft.address, // parent NFT
                    1, // token ID
                    1, // salt
                    "0x" // init calldata
                );

            const ERC6551Account = await ethers.getContractFactory(
                "ERC6551Account"
            );
            const TBA = ERC6551Account.attach(newAccount);
            console.log(await TBA.owner());

            expect(
                await registry.account(
                    account.address,
                    43113,
                    testNft.address,
                    1,
                    1
                )
            ).to.equal(newAccount);
        });
    });

    async function setup2() {
        const { owner, otherAccount, testNft, registry, account } =
            await loadFixture(setup);

        await testNft.safeMint(otherAccount.address, METADATA_URL); // tokenId = 1
        await testNft.safeMint(owner.address, METADATA_URL); // tokenId = 2

        const tokenBoundAccount = await registry
            .connect(owner)
            .callStatic.createAccount(
                account.address, // implementation contract
                43113, // avalanche testnet
                testNft.address, // parent NFT
                1, // token ID
                1, // salt
                "0x" // init calldata
            );
        return {
            owner,
            otherAccount,
            testNft,
            registry,
            account,
            tokenBoundAccount,
        };
    }

    describe("Account (implementation contract)", function () {
        it("Should receive asset successfuly", async function () {
            const { owner, otherAccount, testNft, registry, account } =
                await loadFixture(setup2);
            console.log(await testNft.balanceOf(owner.address));
        });
    });
});
