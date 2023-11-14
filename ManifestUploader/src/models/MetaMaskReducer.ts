export interface MetaMaskState {
	account: string;
	connected: boolean;
	balance: number;
}

export type MetaMaskAction =
	| {
			type: 'CONNECT';
			account: string;
	  }
	| {
			type: 'BALANCE';
			balance: number;
	  }
	| {
			type: 'DISCONNECT';
	  };

export function MetaMaskReducer(
	state: MetaMaskState,
	action: MetaMaskAction
): MetaMaskState {
	switch (action.type) {
		case 'CONNECT':
			return {
				...state,
				account: action.account,
				connected: true
			};
		case 'DISCONNECT':
			return {
				...state,
				account: '',
				connected: false
			};
		case 'BALANCE':
			return {
				...state,
				balance: action.balance
			};
		default:
			return state;
	}
}
