import {WatermarkingTools} from "./TOW/watermarkingTools";
import {Parser} from "./Parser";
import {Config} from "./Config";
import { Payload } from "./Payload";

export module Utils {
	export function applyExport(origDoc : GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		const fileName = origDoc.getName();
		const filePath = DriveApp.getFileById(origDoc.getId()).getParents().next();

		const fakePayload = Payload.generatePayload(Config.getUserID(), "123456"); //TODO get doc ID

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
