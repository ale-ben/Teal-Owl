import { toggleReader } from './pageParser';

chrome.action.onClicked.addListener(async (tab) => {
	await chrome.scripting.executeScript({
		target: { tabId: tab.id ? tab.id : -1 },
		func: toggleReader
	});
});
