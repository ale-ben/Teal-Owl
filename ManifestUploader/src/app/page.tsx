'use client';

import { Button } from '@nextui-org/react';
import { useAccount, useConnect, useContractRead, useNetwork } from 'wagmi';
import contract_address from '../../static/contractInfo/deployed_addresses.json';

import { InjectedConnector } from 'wagmi/connectors/injected';
import contract_info from '../../static/contractInfo/TealOwlDeploy#TealOwl.json';

export default function Home() {
	const { address, isConnected } = useAccount();
	const { chain, chains } = useNetwork();
	const { connect } = useConnect({
		connector: new InjectedConnector()
	});

	const deployAddress = contract_address[
		'TealOwlDeploy#TealOwl'
	] as `0x${string}`;

	const minter = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
	const tokenID = 0;
	const uri = 'ipfs://QmP2bWnyqx3NWXJew15vBscbPzUvbWWKqesb8J5nBCeH4r';

	const { data, isError, isLoading } = useContractRead({
		address: deployAddress,
		abi: contract_info.abi,
		functionName: 'name'
	});

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
				isDisabled={isConnected}
				onPress={async () => {
					console.log('pressed');
					connect();
				}}
			>
				Connect
			</Button>
			<Button
				onPress={async () => {
					console.log('pressed');
					console.log('data', data);
				}}
			>
				Read Wagmi
			</Button>
		</div>
	);
}
