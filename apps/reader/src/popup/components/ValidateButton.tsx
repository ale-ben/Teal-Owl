interface props {
	actionLabel: string;
}

const ValidateButton = ({ actionLabel }: props) => {
	return (
		<button
			className="mt-5 rounded-lg border border-white px-5 py-2.5 text-center text-sm font-medium text-white hover:border-blue-900 hover:bg-white hover:text-blue-900"
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
	);
};

export default ValidateButton;
