import { useState } from 'react';

function App() {
	const [validationState, setValidationState] =
		useState<string>('Not Validated');
	const [actionLabel, setActionLabel] = useState<string>('Validate');

	chrome.runtime.onMessage.addListener(function (request) {
		if (request.event === 'statusChange') {
			switch (request.status) {
				case 'EMPTY':
					setValidationState(request.status);
					setActionLabel('Validate');
					break;
				case 'VALIDATED':
					setValidationState(request.status);
					setActionLabel('Show');
					break;
				case 'SHOWING':
					setValidationState(request.status);
					setActionLabel('Hide');
					break;
				default:
					console.error('Teal-Owl popup', 'Unknown status', request.status);
			}
		}
	});

	return (
		<div className="flex h-96 w-80 flex-col justify-evenly bg-blue-900 p-5">
			<p className="text-center text-3xl font-bold text-white">
				Teal Owl - Reader
			</p>
			<div className="text-center text-xl text-white">
				Status:
				<div className="font-bold">{validationState}</div>
			</div>
			<button
				className="mb-2 mr-2 rounded-lg border border-white px-5 py-2.5 text-center text-sm font-medium text-white hover:border-blue-900 hover:bg-white hover:text-blue-900"
				onClick={async () => {
					const queryOptions = {
						active: true,
						currentWindow: true
					};
					const tabs = await chrome.tabs.query(queryOptions);
					const tab = tabs[0];

					console.log('Toggle');
					chrome.tabs
						.sendMessage(tab.id ? tab.id : -1, {
							event: 'toggle'
						})
						.catch((error): void => {
							console.error('Teal-Owl', error);
						});
				}}
			>
				{actionLabel}
			</button>
		</div>
	);
}

export default App;
