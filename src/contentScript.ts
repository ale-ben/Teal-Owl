// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import { WatermarkingTools } from "./watermarkingTools";

// Custom CSS for highlighting
const redHighlight: string = 'style="background-color: rgb(248 113 113);"';
const greenHighlight: string = 'style="background-color: rgb(74 222 128);"';
const blueHighlight: string = 'style="background-color: rgb(96 165 250);"';

const body = document.querySelector("body");

if (body != null) {
	if (body.innerHTML.includes(WatermarkingTools.NPC)) {
		console.log("Non Printable Character found");
		body.innerHTML = body.innerHTML.replaceAll(WatermarkingTools.NPC, '<span ' + blueHighlight + '>' + WatermarkingTools.NPC + "</span>");
	}

	for (let i = 1; i < WatermarkingTools.TableSpaces.length; i++) {
		if (body.innerHTML.includes(WatermarkingTools.TableSpaces[i])) {
			console.log("Homoglyph space found");
			body.innerHTML = body.innerHTML.replaceAll(WatermarkingTools.TableSpaces[i], '<span ' + redHighlight + '>' + WatermarkingTools.TableSpaces[i] + "</span>");
		}
	}

	WatermarkingTools.TableCharacters.homoglyph.forEach(function (char) {
		if (body.innerHTML.includes(char)) {
			console.log("Homoglyph char found");
			body.innerHTML = body.innerHTML.replaceAll(char, '<span ' + greenHighlight + '>' + char + "</span>");
		}
	});
}

/*
// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

*/
