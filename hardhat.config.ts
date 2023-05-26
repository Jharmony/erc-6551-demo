import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();

const config: HardhatUserConfig = {
    solidity: "0.8.13",
    etherscan: {
        apiKey: {
            avalancheFujiTestnet: `${process.env.AVALANCHE_API_KEY}`,
            polygonMumbai: `${process.env.MUMBAI_API_KEY}`,
        },
    },
    networks: {
        avalancheFujiTestnet: {
            url: `${process.env.FUJI_RPC_URL}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        polygonMumbai: {
            url: `${process.env.MUMBAI_RPC_URL}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
};

export default config;
