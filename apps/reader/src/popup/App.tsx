import { useReducer, useState } from 'react';
import { getName } from '../contract/contractUtils';
import Results from './components/Results';
import ValidateButton from './components/ValidateButton';
import { initialState, reducer } from './models/popupReducer';

function App() {
	const [contractName, setContractName] = useState<string>('');

	const [state, dispatch] = useReducer(reducer, initialState);

	getName().then((name) => setContractName(name || ''));

	chrome.runtime.onMessage.addListener(function (request) {
		if (request.event === 'statusChange') {
			console.log('Status change', request);
		}
	});

	chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"});
	chrome.storage.session.onChanged.addListener((changes) => {
		console.log('Changes', changes);
	})

	return (
		<div className="flex min-h-96 max-h-[38rem] w-96 flex-col justify-evenly bg-blue-900 p-5">
			<p className="text-center text-3xl font-bold text-white">
				Teal Owl - Reader
			</p>
			<p className="text-center text-lg font-bold text-white">
				Contract name: {contractName}
			</p>
			<ValidateButton actionLabel={state.validateButtonLabel} />
			<Results state={state} />
		</div>
	);
}

export default App;
