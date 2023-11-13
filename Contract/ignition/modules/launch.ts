import { ethers } from "hardhat";

async function main() {
	const Token1 = await ethers.getContractFactory("Rocket");
	// @ts-ignore
	const token1 = await Token1.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3")
	token1.launch()
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});