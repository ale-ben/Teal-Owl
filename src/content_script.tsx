import { toggleReader } from "./pageParser";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(
		sender.tab
			? "from a content script:" + sender.tab.url
			: "from the extension", request
	);
	toggleReader();
	sendResponse({ farewell: "goodbye" });
});
