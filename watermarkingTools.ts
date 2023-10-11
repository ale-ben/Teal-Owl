export module WatermarkingTools {
	type TreeStruct = {
		content: GoogleAppsScript.Document.Element;
		text?: string;
		children: TreeStruct[];
		type: GoogleAppsScript.Document.ElementType; //TODO: Remove this after testing
	};

	interface Paragraph {
		text: string;
		payload: string;
	}

	export const NPC: string = "\u00a7"; // <>; TODO: Change this to the real NPC

	export const TableCharacters: {
		original: string[];
		homoglyph: string[];
	} = {
		original: [
			"\u002d",
			"\u003b",
			"\u0043",
			"\u0044",
			"\u004b",
			"\u004c",
			"\u004d",
			"\u0056",
			"\u0058",
			"\u0063",
			"\u0064",
			"\u0069",
			"\u006a",
			"\u006c",
			"\u0076",
			"\u0078"
		],
		homoglyph: [
			"\u2010",
			"\u037e",
			"\u216d",
			"\u216e",
			"\u212a",
			"\u216c",
			"\u216f",
			"\u2164",
			"\u2169",
			"\u217d",
			"\u217e",
			"\u2170",
			"\u0458",
			"\u217c",
			"\u2174",
			"\u2179"
		]
	};

	export const TableSpaces: string[] = [
		"\u0020",
		"\u2000",
		"\u2004",
		"\u2005",
		"\u2008",
		"\u2009",
		"\u202f",
		"\u205f"
	];

	function getSpaceCode(space : string): string {
		// Find the element in the array
		let index = WatermarkingTools.TableSpaces.indexOf(space);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to get the code of a space that is not in the table");
			return "";
		}

		// Convert the index to binary
		let binary = index.toString(2).padStart(3, "0");

		return binary;
	}

	function getSpaceFromCode(code : string): string {
		// Convert the binary to an integer
		let index = parseInt(code, 2);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to get the space from a code that is not in the table");
			return "";
		}

		return WatermarkingTools.TableSpaces[index];
	}

	function getCharacterWithHomoglyph(character : string, value : string): string {
		let charSet: string[] = value == "1"
			? WatermarkingTools.TableCharacters.homoglyph
			: WatermarkingTools.TableCharacters.original;

		// Find the element in the array
		let index = WatermarkingTools.TableCharacters.original.indexOf(character);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to apply homoglyph to a character that is not in the original set");
			return "";
		}

		return charSet[index];
	}

	/**
	 * Given a character, returns the payload it represents (if any)
	 * @param character The character to get the payload from
	 * @returns The payload represented by the character
	 */
	function getCodeFromCharacter(character : string): string {
		if (WatermarkingTools.TableCharacters.original.includes(character)) 
			return "0";
		if (WatermarkingTools.TableCharacters.homoglyph.includes(character)) 
			return "1";
		if (WatermarkingTools.TableSpaces.includes(character)) {
			return getSpaceCode(character);
		}
		return "";
	}

	export function encodeText(text : string, binaryCode : string): string {
		// Initializa output string with the NPC
		var outText = WatermarkingTools.NPC;

		// Iterator index for binary code
		var binIter = 0;
		// Length of the binary code
		const binLen = binaryCode.length;

		// Iterate over the text
		for (const c of text) {
			if (WatermarkingTools.TableCharacters.original.includes(c)) {
				outText = outText.concat(getCharacterWithHomoglyph(c, binaryCode.charAt(binIter)));
				binIter += 1;
			} else if (WatermarkingTools.TableSpaces.includes(c)) {
				// Get the binary code for the space (composed of 3 bits with eventual 0 padding)
				var bitStr = "";
				for (let i = binIter; i < binIter + 3; i++) {
					if (i < binLen) {
						bitStr = bitStr.concat(binaryCode[i]);
					} else {
						bitStr = bitStr.concat("0");
					}
				}
				outText = outText.concat(getSpaceFromCode(bitStr));
				binIter += 3;
			} else {
				outText = outText.concat(c);
			}

			// If the binary code is over, add the NPC and restart from 0
			if (binIter >= binLen) {
				outText = outText.concat(WatermarkingTools.NPC);
				binIter = 0;
			}
		}

		return outText.concat(WatermarkingTools.NPC).replaceAll(WatermarkingTools.NPC + WatermarkingTools.NPC, WatermarkingTools.NPC);
	}

	export function encodeTree(tree : TreeStruct[], binaryCode : string) {
		// Initializa output string with the NPC

		// Iterator index for binary code
		var binIter = 0;
		// Length of the binary code
		const binLen = binaryCode.length;

		// Iterate over the text
		for (const text of tree) {
			if (text.text === undefined) 
				continue;
			var outText = "";
			for (const c of text.text) {
				if (WatermarkingTools.TableCharacters.original.includes(c)) {
					outText = outText.concat(getCharacterWithHomoglyph(c, binaryCode.charAt(binIter)));
					binIter += 1;
				} else if (WatermarkingTools.TableSpaces.includes(c)) {
					// Get the binary code for the space (composed of 3 bits with eventual 0 padding)
					var bitStr = "";
					for (let i = binIter; i < binIter + 3; i++) {
						if (i < binLen) {
							bitStr = bitStr.concat(binaryCode[i]);
						} else {
							bitStr = bitStr.concat("0");
						}
					}
					outText = outText.concat(getSpaceFromCode(bitStr));
					binIter += 3;
				} else {
					outText = outText.concat(c);
				}

				// If the binary code is over, add the NPC and restart from 0
				if (binIter >= binLen) {
					outText = outText.concat(WatermarkingTools.NPC);
					binIter = 0;
				}
			}

			text.text = outText;
		}

		// Add NPC at beginning of first text and end of last text
		tree[0].text = WatermarkingTools.NPC + tree[0].text;
		tree[tree.length - 1].text = tree[tree.length - 1].text + WatermarkingTools.NPC;

		// Remove double NPC
		for (const text of tree) {
			if (text.text === undefined) 
				continue;
			text.text = text.text.replaceAll(WatermarkingTools.NPC + WatermarkingTools.NPC, WatermarkingTools.NPC);
		}
	}

	/**
	 * Split the text into paragraphs and decode each paragraph
	 * @param text The text to decode
	 * @returns The decoded paragraphs
	 */
	export function decodeParagraphs(text : string): Paragraph[] {
		let paragraphs: Paragraph[] = [];

		const split = text.split(WatermarkingTools.NPC);

		split.forEach((par) => {
			if (par.length == 0) 
				return;
			
			// Initialize the output string
			const out = WatermarkingTools.decodeText(par);

			if (out.payload.length == 0) 
				return;
			
			paragraphs.push(out);
		});

		return paragraphs;
	}

	/**
	 * Decodes a single paragraph
	 * @param text The text to decode
	 * @returns
	 */
	export function decodeText(text : string): {
		payload: string;
		text: string
	} {
		// Initialize the output string
		var outCode = "";
		var outText = "";

		// Iterate over the text
		for (const c of text) {
			const code = getCodeFromCharacter(c);
			outCode = outCode.concat(code);

			if (code == "" || code == "0") {
				outText = outText.concat(c);
			} else if (code == "1") {
				outText = outText.concat(WatermarkingTools.TableCharacters.original[WatermarkingTools.TableCharacters.homoglyph.indexOf(c)]);
			} else {
				outText = outText.concat(WatermarkingTools.TableSpaces[0]);
			}
		}

		return {payload: outCode, text: outText};
	}

	/**
	 * Extracts the text from a list of paragraphs
	 * @param paragraphs The list of paragraphs to extract the text from
	 * @returns The extracted text
	 */
	function extractTextFromParagraphs(paragraphs : Paragraph[]): string {
		let text = "";
		paragraphs.forEach((par) => {
			text = text.concat(par.text);
		});
		return text;
	}

	/**
	 * Converts a watermarked text to a text without homoglyphs
	 * @param str The watermarked text
	 * @returns The text without homoglyphs
	 */
	export function extractRawText(str: string): string {
		const html = decodeParagraphs(str);
		const text = extractTextFromParagraphs(html);
		return text;
	}
}

function testWatermark() {
	// const text = "Test apply watermark";
	// const payload = "10";

	// const encoded = WatermarkingTools.encodeText(text, payload);
	// console.log(encoded);

	console.log(JSON.stringify(WatermarkingTools.decodeText("as dfghjr5y htre ge56treg5r tgfhjyk5e 6rt")));
}
