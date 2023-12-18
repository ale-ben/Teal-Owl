import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import {AdminWallet, MinterWallet} from "../..//credentials.json";

export default buildModule("TealOwlDeploy", (m: any) => {
  const TOContract = m.contract("TealOwl", [AdminWallet, MinterWallet]);

  return { TOContract };
});