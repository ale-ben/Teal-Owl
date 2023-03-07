
export module Parser {

	/**
	 * Tree structure of the document
	 */
	export type TreeStruct = {
		content: GoogleAppsScript.Document.Element;
		children: TreeStruct[];
		type: GoogleAppsScript.Document.ElementType; //TODO: Remove this after testing
	};

	/**
	 * Main function to parse the document into a tree structure.
	 * @param content The body of the document
	 * @returns The root of the tree structure of the document as a TreeStruct object.
	 */
	export function ParseDocument(content : GoogleAppsScript.Document.Body): TreeStruct {

		// Queue for the elements to be parsed (See BFS algorithm)
		let parseQueue: TreeStruct[] = [];

		// Root of the tree structure
		let root: TreeStruct = {
			content: content,
			children: [],
			type: content.getType()
		};

		parseQueue.push(root);

		// Next element in the queue
		let el: TreeStruct | undefined;

		// Parse each element in the queue. This function will add the elements to the tree and push the childs to the queue.
		while ((el = parseQueue.shift()) != undefined) {
			parseElement(parseQueue, el);
		}

		return root;
	}

	/**
	 * Internal function to parse an element into a tree structure.
	 * @param parseQueue Queue of elements to be parsed
	 * @param elem The element to be parsed
	 */
	function parseElement(parseQueue : TreeStruct[], elem : TreeStruct) {
		// Define how to parse each type of element.
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

	/**
	 * Converts the tree structure of the document into a formatted HTML string.
	 * @param tree The root of the tree structure of the document
	 * @param indent Indent string to be placed before each line
	 * @returns The HTML representation of the document
	 */
	export function ConvertToHTML(tree : TreeStruct, indent : string = ""): string {
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
			html += indent + "\t" + ConvertToHTML(child, indent + "\t");
		});

		if (suffix != "") 
			html += "\n" + indent + suffix + "\n";
		
		return html;
	}
}

export function testParse() {
	const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
	const tree = Parser.ParseDocument(doc.getBody());
	const html = Parser.ConvertToHTML(tree);
	console.log(html);
}
