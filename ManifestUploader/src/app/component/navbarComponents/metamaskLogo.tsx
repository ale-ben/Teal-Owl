import Image from 'next/image';
import React from 'react';

const MetamaskLogo = () => {
	return (
		<Image
			src="images/metamask.svg"
			className="h-6 w-6"
			alt="Metamask Logo"
			width={24}
			height={24}
		/>
	);
};

export default MetamaskLogo;
