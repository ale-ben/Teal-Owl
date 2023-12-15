import { Parser } from './Parser';
import { Payload } from './Payload';
import { WatermarkingToolsGAS } from '@teal-owl/watermarking';

export module Utils {
	export function applyWatermark(
		content: GoogleAppsScript.Document.Document,
		payload: string
	): string {
		// Generate document tree
		const [tree, textElements] = Parser.ParseDocument(content.getBody());

		// Apply watermark
		WatermarkingToolsGAS.encodeTree(textElements, payload);

		// Convert tree to HTML
		const outHTML = Parser.ConvertToHTML(tree);

		return outHTML;
	}

	export function saveToHTMLFile(
		content: string,
		path: GoogleAppsScript.Drive.Folder,
		name: string
	): GoogleAppsScript.Drive.File {
		// Generate out document
		const outFile = DriveApp.createFile(
			name + '.html',
			content,
			'text/html'
		);
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(path);

		return outFile;
	}

	export function saveToJSONFile(
		content: string,
		path: GoogleAppsScript.Drive.Folder,
		name: string
	): GoogleAppsScript.Drive.File {
		// Generate out document
		const outFile = DriveApp.createFile(
			name + '.json',
			content,
			'text/json'
		);
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(path);

		return outFile;
	}
}

export function testApply() {
	const doc = DocumentApp.openById(
		'1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8'
	);
	const payload = Payload.GeneratePayload('test1', '123456');
	const payloadStr = Payload.StringToBinStr(payload);
	const outHTML = Utils.applyWatermark(doc, payloadStr);
	Utils.saveToHTMLFile(
		outHTML,
		DriveApp.getFileById(doc.getId()).getParents().next(),
		'test_wm'
	);
}

export function testSave() {
	const folder = DriveApp.getFileById(
		'1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8'
	)
		.getParents()
		.next();
	Utils.saveToJSONFile(JSON.stringify({ test: true }), folder, 'test');
	Utils.saveToHTMLFile(
		'<html><body><h1>Test</h1></body></html>',
		folder,
		'test'
	);
}
