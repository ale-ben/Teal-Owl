import { toggleReader } from './pageParser';

console.log('Content script loaded!');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (sender.tab === undefined && request.event && request.event === 'toggle')
		await toggleReader();
	sendResponse({ success: true });
});
