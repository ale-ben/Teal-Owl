import {WatermarkingTools} from "./TOW/watermarkingTools";

export module Utils {
	export function applyExportPDF(origDoc : GoogleAppsScript.Document.Document): GoogleAppsScript.Document.Document {
		const docID = origDoc.getId();
		const fileName = origDoc.getName();

		// Generate out document
		const outFile = DocumentApp.create("wm_" + fileName);
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(DriveApp.getFileById(docID).getParents().next());

		const originalBody = origDoc.getBody().editAsText();

		const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
		const originalText = originalBody.getText();
		const watermarkedBody = WatermarkingTools.encodeText(originalText, fakePayload);
		console.log(watermarkedBody);
		outFile.getBody().setText(watermarkedBody);

		return outFile;
	}
}

export function testApply() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	Utils.applyExportPDF(doc);
}
