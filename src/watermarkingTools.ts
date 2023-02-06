export class WatermarkingTools {
	public static readonly NPC: string = "\u00a7"; // <>;

	public static readonly TableCharacters: {
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

	public static readonly TableSpaces: string[] = [
		"\u0020",
		"\u2000",
		"\u2004",
		"\u2005",
		"\u2008",
		"\u2009",
		"\u202f",
		"\u205f"
	];

	private static getSpaceCode(space : string): string {
		// Find the element in the array
		let index = this.TableSpaces.indexOf(space);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to get the code of a space that is not in the table")
			return "";
		}
		
		// Convert the index to binary
		let binary = index.toString(2);

		return binary;
	}

	private static getSpaceFromCode(code : string): string {
		// Convert the binary to an integer
		let index = parseInt(code, 2);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to get the space from a code that is not in the table")
			return "";
		}
		
		return this.TableSpaces[index];
	}

	private static getCharacterWithHomoglyph(character : string, value : string): string {
		let charSet: string[] = value == "1"
			? this.TableCharacters.homoglyph
			: this.TableCharacters.original;

		// Find the element in the array
		let index = this.TableCharacters.original.indexOf(character);

		// If not found, return an empty string
		if (index == -1) {
			console.warn("Trying to apply homoglyph to a character that is not in the original set")
			return "";
		}
		
		return charSet[index];
	}

	private static getCodeFromCharacter(character : string): string {
		if (this.TableCharacters.original.indexOf(character) != -1) 
			return "0";
		if (this.TableCharacters.homoglyph.indexOf(character) != -1) 
			return "1";
		return "";
	}

	public static encodeText(text : string, binaryCode : string): string {
		// Initializa output string with the NPC
		var outText = this.NPC;

		// Iterator index for binary code
		var binIter = 0;
		// Length of the binary code
		const binLen = binaryCode.length;

		// Iterate over the text
		for (const c of text) {
			if (this.TableCharacters.original.includes(c)) {
				outText = outText.concat(this.getCharacterWithHomoglyph(c, binaryCode.charAt(binIter)));
				binIter += 1;
			} else if (this.TableSpaces.includes(c)) {
				// Get the binary code for the space (composed of 3 bits with eventual 0 padding)
				var bitStr = "";
				for (let i = binIter; i < binIter + 3; i++) {
					if (i < binLen) {
						bitStr = bitStr.concat(binaryCode[i]);
					} else {
						bitStr = bitStr.concat("0");
					}
				}
				outText = outText.concat(this.getSpaceFromCode(bitStr));
				binIter += 3;
			} else {
				outText = outText.concat(c);
			}

			// If the binary code is over, add the NPC and restart from 0
			if (binIter >= binLen) {
				outText = outText.concat(this.NPC);
				binIter = 0;
			}
		}

		return outText.concat(this.NPC).replaceAll(this.NPC + this.NPC, this.NPC);
	}

	// Decode a single paragraph
	public static decodeParagraph(text : string): string {
		return ""
	}

	// Split text based on NPC and call decodeParagraph on all paragraphs
	public static decodeText(text : string): string {
	
		return ""
	}
}