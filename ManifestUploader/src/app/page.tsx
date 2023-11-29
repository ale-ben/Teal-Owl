'use client';

import { useAccount, useNetwork } from '@metamask/sdk-react-ui';
import { Button } from '@nextui-org/react';
import { Contract, ethers } from 'ethers';
import contract_info from '../../static/contractInfo/TealOwlDeploy#TealOwl.json';
import contract_address from '../../static/contractInfo/deployed_addresses.json';

export default function Home() {
	const { address, isConnected } = useAccount();
	const { chain, chains } = useNetwork();

	const deployAddress = contract_address[
		'TealOwlDeploy#TealOwl'
	] as `0x${string}`;

	const minter = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
	const tokenID = 0;
	const uri = 'ipfs://QmP2bWnyqx3NWXJew15vBscbPzUvbWWKqesb8J5nBCeH4r';

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Upload a new manifest</p>
			{
				//<UploadComponent />
			}
			<div>
				<p className="text-3xl">Contract status</p>
				<p>Chain ID: {JSON.stringify(chain)}</p>
				<p>Account: {address}</p>
				<p>Connected: {isConnected ? 'true' : 'false'}</p>
				<p>Deploy Address: {deployAddress}</p>
			</div>
			<Button
				onPress={async () => {
					console.log('pressed');
					if (window && window.ethereum) {
						const provider = new ethers.BrowserProvider(
							window.ethereum
						);
						const signer = await provider.getSigner();
						const contract = new Contract(
							deployAddress,
							contract_info.abi,
							provider
						);
						const contractWithSigner = contract.connect(signer);
						// @ts-ignore
						const res = await contractWithSigner.name()	;
						console.log('uri', res);
					}
				}}
			>
				a
			</Button>
		</div>
	);
}
