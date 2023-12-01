'use client';

import { getName } from '@/utils/contractUtils';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
	const { isConnected } = useAccount();
	const [name, setName] = useState('');
	const [pageReady, setPageReady] = useState(false);

	useEffect(() => {
		setPageReady(true);
	}, []);

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Upload a new manifest</p>
			{
				//<UploadComponent />
			}
			<div>
				<p className="text-3xl">Contract name: {name}</p>
			</div>

			<Button
				isDisabled={!pageReady || !isConnected}
				onPress={() => {
					console.log('pressed');
					getName()
						.then((name) => {
							if (name) {
								console.log('name', name);
								setName(name);
							} else {
								console.log('no name');
							}
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			>
				getName
			</Button>
		</div>
	);
}
