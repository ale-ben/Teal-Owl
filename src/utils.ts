import {WatermarkingTools} from "./TOW/watermarkingTools";

type TreeStruct = {
	content: GoogleAppsScript.Document.Element;
	children: TreeStruct[];
	type: GoogleAppsScript.Document.ElementType; //TODO: Remove this after testing
};

export module Utils {
	export function applyExport(origDoc : GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		const docID = origDoc.getId();
		const fileName = origDoc.getName();

		const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110" +
				"100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
		const originalText = origDoc.getBody().getText();

		//const tmp = prepareText(origDoc.getBody());

		const outText = applyWatermark(originalText, fakePayload);

		return saveToFile(outText, origDoc);
	}

	/*
		1. Generate a tree structure of the document
		2. Apply Watermark to the tree
		3. Convert from tree to HTML

		tree structure treeStrut:
		{
			"type": type,
			"content": content,
			"children": [child1: treeStrut, child2: treeStrut, ...]
		}
	*/
	export function parseDocument(content : GoogleAppsScript.Document.Body): TreeStruct {
		//TODO: Remove export
		let parseQueue: TreeStruct[] = [];

		let root: TreeStruct = {
			content: content,
			children: [],
			type: content.getType()
		};

		parseQueue.push(root);

		let el: TreeStruct | undefined;

		while ((el = parseQueue.shift()) != undefined) {
			parseElement(parseQueue, el);
		}

		return root;
	}

	function parseElement(parseQueue : TreeStruct[], elem : TreeStruct) {
		if (elem.content.getType() == DocumentApp.ElementType.PARAGRAPH) {
			let par = elem.content.asParagraph();

			for (let i = 0; i < par.getNumChildren(); i++) {
				let child = {
					content: par.getChild(i),
					children: [],
					type: par.getChild(i).getType()
				};
				elem.children.push(child);
				parseQueue.push(child);
			}
		} else if (elem.content.getType() == DocumentApp.ElementType.BODY_SECTION) {
			let par = elem.content.asBody();

			for (let i = 0; i < par.getNumChildren(); i++) {
				let child = {
					content: par.getChild(i),
					children: [],
					type: par.getChild(i).getType()
				};
				elem.children.push(child);
				parseQueue.push(child);
			}
		}
	}

	export function convertToHTML(tree : TreeStruct, indent : string = ""): string {
		let html = "";

		let prefix = "";
		let suffix = "";

		switch (tree.content.getType()) {
			case DocumentApp.ElementType.BODY_SECTION:
				prefix = "<watermark>";
				suffix = "</watermark>";
				break;
			case DocumentApp.ElementType.PARAGRAPH:
				prefix = "<p>";
				suffix = "</p>";
				break;
			case DocumentApp.ElementType.TEXT:
				prefix = "";
				suffix = "";
				html += tree.content.asText().getText();
				break;
		}

		if (prefix != "") 
			html += "\n" + indent + prefix + "\n";
		
		tree.children.forEach((child) => {
			html += indent + "\t" + convertToHTML(child, indent + "\t");
		});

		if (suffix != "") 
			html += "\n" + indent + suffix + "\n";
		
		return html;
	}

	function applyWatermark(content : string, payload : string): string {
		const outText = WatermarkingTools.encodeText(content, payload);

		return outText;
	}

	function saveToFile(content : string, originalFile : GoogleAppsScript.Document.Document): GoogleAppsScript.Drive.File {
		// Generate out document
		const outFile = DriveApp.createFile(originalFile.getName() + "_wm", content, "text/html");
		// Move to correct folder
		DriveApp.getFileById(outFile.getId()).moveTo(DriveApp.getFileById(originalFile.getId()).getParents().next());

		return outFile;
	}
}

export function testApply() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	Utils.applyExport(doc);
}

export function testParse() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	const tree = Utils.parseDocument(doc.getBody());
	const html = Utils.convertToHTML(tree);
	console.log(html);
}
