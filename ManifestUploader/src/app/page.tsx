'use client';

import { useReducer } from 'react';
import { RetrieveComponent } from './components/retrieve';
import { UploadComponent } from './components/upload';
import { MetaMaskReducer, MetaMaskState } from '@/models/MetaMaskReducer';
import { Button } from '@nextui-org/react';
import { connectWallet, getBalance } from '@/models/MetaMaskUtils';

const initialState: MetaMaskState = {
	account: '',
	connected: false,
	balance: 0
};

export default function Home() {
	const [state, dispatch] = useReducer(MetaMaskReducer, initialState);

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Upload a new manifest</p>
			<UploadComponent />
		</div>
	);
}

/*
<div>
				<p className='text-3xl'>Metamask status</p>
				<p>Connected: {state.connected ? 'true' : 'false'}</p>
				<p>Account: {state.account}</p>
				<p>Balance: {state.balance}</p>
			</div>
			<div className='mt-5'>
				<Button
					color="primary"
					onClick={async () => {
						const wallet = await connectWallet();
						console.log(wallet);
						if (wallet) {
							dispatch({ type: 'CONNECT', account: wallet });
							dispatch({ type: 'BALANCE', balance: await getBalance(wallet) });
						}
					}}
				>
					Connect
				</Button>
				<Button
					color="danger"
					onClick={() => dispatch({ type: 'DISCONNECT' })}
				>
					Disconnect
				</Button>
			</div>
			*/
