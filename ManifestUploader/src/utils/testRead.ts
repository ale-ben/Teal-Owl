const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const abi = [{
	inputs: [],
	name: 'name',
	outputs: [
		{
			internalType: 'string',
			name: '',
			type: 'string'
		}
	],
	stateMutability: 'view',
	type: 'function'
}];

async function main() {
	const {createPublicClient, http, defineChain} = require('viem');

	const localChain = defineChain({
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

	const client = createPublicClient({
	  chain: localChain,
	  transport: http('http://127.0.0.1:8545')
	})

	console.log(await client.readContract({
		address,
		abi,
		functionName: 'name',
	}))
}

main();
