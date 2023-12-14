import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
import {InfuriaAPIKEY, SepoliaPrivKey, EthersanAPIKey} from "./credentials.json"

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
// const INFURA_API_KEY = "";

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
// const SEPOLIA_PRIVATE_KEY = "";

const config: HardhatUserConfig = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${InfuriaAPIKEY}`,
      accounts: [SepoliaPrivKey]
    }
  },
  etherscan: {
    apiKey: EthersanAPIKey,
  }
};

export default config;
