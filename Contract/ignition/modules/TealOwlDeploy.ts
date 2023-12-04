import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const admin = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const minter = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export default buildModule("TealOwlDeploy", (m) => {
  const TOContract = m.contract("TealOwl", [admin, minter]);

  return { TOContract };
});