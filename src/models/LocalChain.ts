import { defineChain } from 'viem';

export const localChain = defineChain({
	id: 31337,
	name: 'Localhost',
	network: 'localhost',
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH'
	},
	rpcUrls: {
		default: {
			http: ['http://127.0.0.1:8545']
		},
		public: {
			http: ['http://127.0.0.1:8545']
		}
	}
});
