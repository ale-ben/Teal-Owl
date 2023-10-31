import { toggleReader } from './pageParser';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (sender.tab === undefined && request.event && request.event === 'toggle')
		toggleReader();
	sendResponse({ farewell: 'goodbye' });
});

console.log('content_script.tsx loaded');
