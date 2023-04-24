import {WatermarkingTools} from "./TOW/watermarkingTools";
import {Parser} from "./Parser";

export module Utils {
	export function applyExport(origDoc : GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		const fileName = origDoc.getName();
		const filePath = DriveApp.getFileById(origDoc.getId()).getParents().next();

		const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110" +
				"100101110011001000000110000101110111011001010111001101101111011011010110010100100001";

		const tree = applyWatermark(origDoc, fakePayload);
		const outHTML = Parser.ConvertToHTML(tree);

		return saveToFile(outHTML, filePath, fileName + "_out.html");
	}

	function applyWatermark(content : GoogleAppsScript.Document.Document, payload : string): Parser.TreeStruct {
		const [tree, textElements] = Parser.ParseDocument(content.getBody());
		WatermarkingTools.encodeTree(textElements, "100100101010101010101");
		return tree;
	}

	function saveToFile(content : string, path : GoogleAppsScript.Drive.Folder, name : string): GoogleAppsScript.Drive.File {
		// Generate out document
		const outFile = DriveApp.createFile(name, content, "text/html");
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(path);

		return outFile;
	}
}

export function testApply() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	Utils.applyExport(doc);
}
