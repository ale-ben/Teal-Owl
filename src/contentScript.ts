// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import {WatermarkingTools} from "./TOW/watermarkingTools";

// Custom CSS for highlighting
const redHighlight: string = 'style="background-color: rgb(248 113 113);"';
const greenHighlight: string = 'style="background-color: rgb(74 222 128);"';
const blueHighlight: string = 'style="background-color: rgb(96 165 250);"';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "TO_COMMAND") {
		let message = null;
		if (request.payload != null) message = request.payload.message;
		console.debug("Recieved TO_COMMAND message from content script: " + message);
		if (message != null && message === "highlightHomoglyphs") highlightHomoglyphs();
	}
});

function highlightHomoglyphs() {


	const body = document.querySelector("body");

	if (body != null && !body.hasAttribute("TO_HIGHLIGHTED")) {
		if (body.innerHTML.includes(WatermarkingTools.NPC)) {
			console.log("Non Printable Character found");
			body.innerHTML = body.innerHTML.replaceAll(WatermarkingTools.NPC, "<span " + blueHighlight + ">" + WatermarkingTools.NPC + "</span>");
		}

		for (let i = 1; i < WatermarkingTools.TableSpaces.length; i++) {
			if (body.innerHTML.includes(WatermarkingTools.TableSpaces[i])) {
				console.log("Homoglyph space found");
				body.innerHTML = body.innerHTML.replaceAll(WatermarkingTools.TableSpaces[i], "<span " + redHighlight + ">" + WatermarkingTools.TableSpaces[i] + "</span>");
			}
		}

		WatermarkingTools.TableCharacters.homoglyph.forEach(function (char) {
			if (body.innerHTML.includes(char)) {
				console.log("Homoglyph char found");
				body.innerHTML = body.innerHTML.replaceAll(char, "<span " + greenHighlight + ">" + char + "</span>");
			}
		});

		body.setAttribute("TO_HIGHLIGHTED", "");
	} else if (body != null && body.hasAttribute("TO_HIGHLIGHTED")) {
		console.log("Already highlighted");
	}
}