import { toggleReader } from './pageParser';

console.log('Content script loaded!');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (sender.tab === undefined && request.event && request.event === 'toggle')
		toggleReader();

	sendResponse({ success: true });
});
