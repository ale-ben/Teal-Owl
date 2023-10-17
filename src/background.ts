function parseContent() {
	const link = document.createElement('meta');
	link.setAttribute('id', 'watermarkingMeta');
	document.getElementsByTagName('head')[0].appendChild(link);
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting
		.executeScript({
			target: { tabId: tab.id ? tab.id : -1 },
			func: parseContent
		})
		.then();
});
