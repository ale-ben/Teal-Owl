import { launchValidation } from './pageParser';

console.log('Content script loaded!');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (sender.tab === undefined && request.event && request.event === 'validate')
		await launchValidation();
	sendResponse({ success: true });
});
