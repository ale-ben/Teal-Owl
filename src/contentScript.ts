// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Custom CSS for highlighting
const redHighlight: string = 'style="background-color: rgb(248 113 113);"';
const greenHighlight: string = 'style="background-color: rgb(74 222 128);"';
const blueHighlight: string = 'style="background-color: rgb(96 165 250);"';

// Non Printable Character used as a delimiter
//const NPC = '\u200b'  Zero Width Space
const NPC = "§"; // <>;

// Homoglyph character encoding
const DecodeTableChar = {
	"\u2010": "\u002d", // -
	"\u037e": "\u003b", // ;
	Ⅽ: "C", // C
	Ⅾ: "D", // D
	K: "K", // K
	Ⅼ: "L", // L
	Ⅿ: "M", // M
	Ⅴ: "V", // V
	Ⅹ: "X", // X
	ⅽ: "c", // c
	ⅾ: "d", // d
	ⅰ: "i", // i
	ј: "j", // j
	ⅼ: "l", // l
	ⅴ: "v", // v
	ⅹ: "x" // x
};

// Homoglyph spaces encoding
const TableSpace = [
	"\u0020",
	"\u2000",
	"\u2004",
	"\u2005",
	"\u2008",
	"\u2009",
	"\u202f",
	"\u205f"
];

const body = document.querySelector("body");

if (body != null) {
	if (body.innerHTML.includes(NPC)) {
		console.log("Non Printable Character found");
		body.innerHTML = body.innerHTML.replaceAll(NPC, '<span ' + blueHighlight + '>' + NPC + "</span>");
	}

	for (let i = 1; i < TableSpace.length; i++) {
		if (body.innerHTML.includes(TableSpace[i])) {
			console.log("Homoglyph space found");
			body.innerHTML = body.innerHTML.replaceAll(TableSpace[i], '<span ' + redHighlight + '>' + TableSpace[i] + "</span>");
		}
	}

	Object.keys(DecodeTableChar).forEach(function (key) {
		if (body.innerHTML.includes(key)) {
			console.log("Homoglyph char found");
			body.innerHTML = body.innerHTML.replaceAll(key, '<span ' + greenHighlight + '>' + key + "</span>");
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
