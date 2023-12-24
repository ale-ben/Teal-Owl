import { highlight, launchValidation } from './pageParser';

console.log('Content script loaded!');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (sender.tab === undefined && request.event) {
		switch (request.event) {
			case 'validate':
				console.log('Validating');
				await launchValidation();
				break;
			case 'highlight':
				console.log('Highlighting', request.paragraphId);
				highlight(request.paragraphId);
				break;
		}
	}
	sendResponse({ success: true });
});
