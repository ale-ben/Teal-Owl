import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const admin = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const minter = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

export default buildModule("TealOwlDeploy1", (m) => {
  const TOContract = m.contract("TealOwl", [admin, minter]);

  return { TOContract };
});