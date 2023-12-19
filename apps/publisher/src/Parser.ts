// This is a customized version of the parser from google docs to html (https://github.com/thejimbirch/GoogleDoc2Html/tree/master) Note that original
// parser is in js, this is converted to ts

import { decodeParagraphs } from '@teal-owl/watermarking';
import { Sha256Hash } from './Payload';

/**
 * Tree structure of the document
 */
export type TreeStruct = {
	content: GoogleAppsScript.Document.Element;
	text?: string;
	children: TreeStruct[];
	type: GoogleAppsScript.Document.ElementType; //TODO: Remove this after testing
};

/**
 * Main function to parse the document into a tree structure.
 * @param content The body of the document
 * @returns The root of the tree structure of the document as a TreeStruct object and an array of tree text elements.
 */
export function ParseDocument(
	content: GoogleAppsScript.Document.Body
): [TreeStruct, TreeStruct[]] {
	// Queue for the elements to be parsed (See BFS algorithm)
	const parseQueue: TreeStruct[] = [];
	const textElements: TreeStruct[] = [];

	// Root of the tree structure
	const root: TreeStruct = {
		content: content,
		children: [],
		type: content.getType()
	};

	parseQueue.push(root);

	// Next element in the queue
	let el: TreeStruct | undefined;

	// Parse each element in the queue. This function will add the elements to the tree and push the childs to the queue.
	while ((el = parseQueue.shift()) != undefined) {
		parseElement(parseQueue, textElements, el);
	}

	return [root, textElements];
}

/**
 * Internal function to parse an element into a tree structure.
 * @param parseQueue Queue of elements to be parsed
 * @param elem The element to be parsed
 */
function parseElement(
	parseQueue: TreeStruct[],
	textElements: TreeStruct[],
	elem: TreeStruct
) {
	// Define how to parse each type of element.
	if (elem.content.getType() == DocumentApp.ElementType.PARAGRAPH) {
		const par = elem.content.asParagraph();

		for (let i = 0; i < par.getNumChildren(); i++) {
			const child = {
				content: par.getChild(i),
				children: [],
				type: par.getChild(i).getType()
			};
			elem.children.push(child);
			parseQueue.push(child);
		}
	} else if (elem.content.getType() == DocumentApp.ElementType.BODY_SECTION) {
		const par = elem.content.asBody();

		for (let i = 0; i < par.getNumChildren(); i++) {
			const child = {
				content: par.getChild(i),
				children: [],
				type: par.getChild(i).getType()
			};
			elem.children.push(child);
			parseQueue.push(child);
		}
	} else if (elem.content.getType() == DocumentApp.ElementType.TEXT) {
		elem.text = elem.content.asText().getText();
		textElements.push(elem);
	}
}

/**
 * Converts the tree structure of the document into a formatted HTML string.
 * @param tree The root of the tree structure of the document
 * @param indent Indent string to be placed before each line
 * @returns The HTML representation of the document
 */
export function ConvertToHTML(tree: TreeStruct, indent: string = ''): string {
	let html = '';

	let prefix = '';
	let suffix = '';

	switch (tree.content.getType()) {
		case DocumentApp.ElementType.BODY_SECTION:
			prefix = '<watermark>';
			suffix = '</watermark>';
			break;
		case DocumentApp.ElementType.PARAGRAPH:
			switch (tree.content.asParagraph().getHeading()) {
				case DocumentApp.ParagraphHeading.HEADING1:
					prefix = '<h1>';
					suffix = '</h1>';
					break;
				case DocumentApp.ParagraphHeading.HEADING2:
					prefix = '<h2>';
					suffix = '</h2>';
					break;
				case DocumentApp.ParagraphHeading.HEADING3:
					prefix = '<h3>';
					suffix = '</h3>';
					break;
				case DocumentApp.ParagraphHeading.HEADING4:
					prefix = '<h4>';
					suffix = '</h4>';
					break;
				case DocumentApp.ParagraphHeading.HEADING5:
					prefix = '<h5>';
					suffix = '</h5>';
					break;
				case DocumentApp.ParagraphHeading.HEADING6:
					prefix = '<h6>';
					suffix = '</h6>';
					break;
				default:
					prefix = '<p>';
					suffix = '</p>';
					break;
			}
			break;
		case DocumentApp.ElementType.TEXT:
			prefix = '';
			suffix = '';
			html += tree.text;
			break;
	}

	if (prefix != '') html += '\n' + indent + prefix + '\n';

	tree.children.forEach((child) => {
		html += indent + '\t' + ConvertToHTML(child, indent + '\t');
	});

	if (suffix != '') html += '\n' + indent + suffix + '\n';

	return html;
}

/**
 * Converts an HTML string into a plain text string by removing all tags.
 * @param html The HTML string to be converted
 * @returns The plain text string
 */
export function HTMLToText(html: string): string {
	return html.replace(/<[^>]*>?/gm, '');
}

/**
 * Generates a hash list from a text. The text is split into paragraphs and homoglyphs are removed.
 * @param text The text to be converted to a hash list
 * @returns The hash list
 */
export function GenerateHashList(text: string): string[] {
	// Split the document into paragraphs and remove homoglyphs
	const paragraphs = decodeParagraphs(text);

	// Generate hash for each paragraph
	return paragraphs.map((par) => Sha256Hash(par.text));
}
