import { encodeTree } from '@teal-owl/watermarking';
import { ConvertToHTML, ParseDocument } from './Parser';

export function applyWatermark(
	content: GoogleAppsScript.Document.Document,
	payload: string
): string {
	// Generate document tree
	const [tree, textElements] = ParseDocument(content.getBody());

	// Apply watermark
	encodeTree(textElements, payload);

	// Convert tree to HTML
	const outHTML = ConvertToHTML(tree);

	return outHTML;
}

export function saveToHTMLFile(
	content: string,
	path: GoogleAppsScript.Drive.Folder,
	name: string
): GoogleAppsScript.Drive.File {
	// Generate out document
	const outFile = DriveApp.createFile(name + '.html', content, 'text/html');
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
	const outFile = DriveApp.createFile(name + '.json', content, 'text/json');
	// Move to correct folder
	DriveApp.getFileById(outFile.getId()).moveTo(path);

	return outFile;
}
