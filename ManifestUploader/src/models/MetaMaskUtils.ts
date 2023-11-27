import { MetaMaskContextStruct } from './MetaMaskContext';

export async function ConnectWallet(): Promise<string | undefined> {
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

export async function GetBalance(account: string): Promise<number> {
	if (!window.ethereum) {
		throw new Error(`invalid ethereum provider`);
	}

	const balance = await window.ethereum.request({
		method: 'eth_getBalance',
		params: [account, 'latest']
	});

	return parseInt(balance as string, 16);
}

export function FormatBalance(balance: number): string {
	const units = [
		'wei',
		'kwei',
		'mwei',
		'gwei',
		'microeth',
		'millieth',
		'eth'
	];
	const accuracy = 4;
	// This loops goes through the units array and checks if the balance is less than the current unit.
	for (let i = 0; i <= units.length; i++) {
		if (i === units.length) {
			// last unit
			return `${(balance / Math.pow(10, 3 * i)).toFixed(accuracy)} ${
				units[i - 1]
			}`;
		}

		if (balance / Math.pow(10, 3 * i) < 1) {
			if (i === 0) {
				return `${balance} ${units[i]}`;
			}

			return `${(balance / Math.pow(10, 3 * (i - 1))).toFixed(
				accuracy
			)} ${units[i - 1]}`;
		}
	}

	return 'ERROR';
}

export function SetListeners(metaMaskContext: MetaMaskContextStruct): void {
	window.ethereum.on('accountsChanged', (accounts: string[]) => {
		console.log(`accounts changed: ${accounts}`);
		if (accounts.length > 0) {
			metaMaskContext.setAddress(accounts[0]);
		} else {
			metaMaskContext.setAddress(undefined);
		}
	});
}
