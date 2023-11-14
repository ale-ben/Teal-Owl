export async function connectWallet(): Promise<string | undefined> {
	if (!window.ethereum) {
		throw new Error(`invalid ethereum provider`);
	}

	const accounts = await window.ethereum.request({
		method: 'eth_requestAccounts'
	});

	if (accounts) {
		const tmp = accounts as string[];
		if (tmp.length > 0) {
			return tmp[0];
		}
	}

	return undefined;
}

export async function getBalance(account: string): Promise<number> {
	if (!window.ethereum) {
		throw new Error(`invalid ethereum provider`);
	}

	const balance = await window.ethereum.request({
		method: 'eth_getBalance',
		params: [account, 'latest']
	});

	return parseInt(balance as string, 16);
}