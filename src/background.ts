chrome.action.onClicked.addListener(async (tab) => {
	chrome.tabs.sendMessage(tab.id ? tab.id : -1, { event: 'toggled' });
});
