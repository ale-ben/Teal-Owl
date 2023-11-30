'use client';

import MetaMaskSDK from '@metamask/sdk';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import MetamaskLogo from './metamaskLogo';

const MetamaskComponent = () => {
	//const formattedBalance = useMemo(() => FormatBalance(balance), [balance]);
	const MMSDK = new MetaMaskSDK({
		enableDebug: false,
		dappMetadata: {
			name: 'Teal Owl'
		}
	});

	const { connect: WagmiConnect } = useConnect({
		connector: new InjectedConnector()
	});

	const { address, isConnecting, isConnected } = useAccount();
	const { chain } = useNetwork();

	const connect = async () => {
		console.log('connect');
		MMSDK.connect().then((accounts) => {
			WagmiConnect();
		});
	};

	return (
		<div>
			{!isConnected && !isConnecting ? (
				<Button
					color="primary"
					href="#"
					variant="flat"
					startContent={MetamaskLogo()}
					onPress={connect}
				>
					Connect with MetaMask
				</Button>
			) : (
				<Popover placement="bottom" showArrow={true}>
					<PopoverTrigger>
						<Button>chainId</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="flex flex-col gap-2">
							<div>Account: {address}</div>
							<div>Balance: balance Wei</div>
							<div>Chain: {chain?.name || 'undefined'}</div>
							<Button
								color="danger"
								onPress={() => alert('Not implemented yet')}
							>
								Logout
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};

export default MetamaskComponent;
