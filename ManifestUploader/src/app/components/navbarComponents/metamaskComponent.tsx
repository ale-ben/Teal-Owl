'use client';

import { MetaMaskContext } from '@/models/MetaMaskContext';
import {
	ConnectWallet,
	FormatBalance,
	GetBalance
} from '@/models/MetaMaskUtils';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useContext, useEffect, useMemo, useState } from 'react';
import MetamaskLogo from './metamaskLogo';

const MetamaskComponent = () => {
	let metaMaskContext = useContext(MetaMaskContext);
	const [balance, setBalance] = useState<number>(0);
	const formattedBalance = useMemo(() => FormatBalance(balance), [balance]);

	useEffect(() => {
		if (metaMaskContext.address !== undefined) {
			GetBalance(metaMaskContext.address).then((balance) => {
				setBalance(balance);
			});
		}
	}, [metaMaskContext.address]);

	return (
		<div>
			{metaMaskContext.address === undefined ? (
				<Button
					color="primary"
					href="#"
					variant="flat"
					startContent={MetamaskLogo()}
					onPress={async () => {
						metaMaskContext.setAddress(await ConnectWallet());
					}}
				>
					Connect with MetaMask
				</Button>
			) : (
				<Popover placement="bottom" showArrow={true}>
					<PopoverTrigger>
						<Button>{formattedBalance}</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="flex flex-col gap-2">
							<div>Account: {metaMaskContext.address}</div>
							<div>Balance: {balance} Wei</div>
							<Button
								color="danger"
								onPress={() =>
									metaMaskContext.setAddress(undefined)
								}
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
