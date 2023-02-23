import {WatermarkingTools} from "./TOW/watermarkingTools";

export module Utils {
	export function applyExport(origDoc : GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		const docID = origDoc.getId();
		const fileName = origDoc.getName();

		const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110" +
				"100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
		const originalText = origDoc.getBody().getText();

		const outText = applyWatermark(originalText, fakePayload);

		return saveToFile(outText, origDoc);
	}

	function applyWatermark(content : string, payload : string): string {
		const enclosingTag = "watermarked";
		const outText = WatermarkingTools.encodeText(content, payload);

		const out = "<" + enclosingTag + ">\n" + outText + "\n</" + enclosingTag + ">";

		return out;
	}

	function saveToFile(content : string, originalFile: GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		// Generate out document
		const outFile = DriveApp.createFile(originalFile.getName()+"_wm", content, "text/html");
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(DriveApp.getFileById(originalFile.getId()).getParents().next());

		return outFile;
	}
}

export function testApply() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	Utils.applyExport(doc);
}
