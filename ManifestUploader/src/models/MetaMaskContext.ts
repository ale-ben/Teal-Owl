import { Dispatch, SetStateAction, createContext } from 'react';

export interface MetaMaskContextStruct {
	address: string | undefined;
	setAddress: Dispatch<SetStateAction<string | undefined>>;
}

export let MetaMaskContext = createContext<MetaMaskContextStruct>({
	address: undefined,
	setAddress: () => {},
});
