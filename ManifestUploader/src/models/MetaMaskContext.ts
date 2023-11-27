import { Dispatch, SetStateAction, createContext } from 'react';

interface MetaMaskContextStruct {
	address: string | undefined;
	setAddress: Dispatch<SetStateAction<string | undefined>>;
}

export let MetaMaskContext = createContext<MetaMaskContextStruct>({
	address: undefined,
	setAddress: () => {}
});
