'use client';

import { MetaMaskButton } from '@metamask/sdk-react-ui';
import { useTheme } from 'next-themes';

const MetamaskComponent = () => {
	const { theme } = useTheme();

	return (
		<div>
			<MetaMaskButton
				theme={theme === 'light' ? 'light' : 'dark'}
				color={theme === 'light' ? 'white' : 'blue'}
			/>
		</div>
	);
};

export default MetamaskComponent;
