import {WatermarkingTools} from "../watermarkingTools";

describe("Testing single character encoding", () => {
	for (let i = 0; i < WatermarkingTools.TableCharacters.original.length; i++) {
		test(`Encoding character ${WatermarkingTools.TableCharacters.original[i]}`, () => {
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableCharacters.original[i], "0")).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableCharacters.original[i]}${WatermarkingTools.NPC}`);
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableCharacters.original[i], "1")).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableCharacters.homoglyph[i]}${WatermarkingTools.NPC}`);
		});
	}
});

describe("Testing single space encoding", () => {
	for (let i = 0; i < WatermarkingTools.TableSpaces.length; i++) {
		test(`Encoding space |${WatermarkingTools.TableSpaces[i]}|`, () => {
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableSpaces[0], i.toString(2).padStart(3, "0"))).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableSpaces[i]}${WatermarkingTools.NPC}`);
		});
	}
});

describe("Testing single character decoding", () => {
	for (let i = 0; i < WatermarkingTools.TableCharacters.original.length; i++) {
		test(`Decoding character ${WatermarkingTools.TableCharacters.original[i]}`, () => {
			expect(WatermarkingTools.decodeText(WatermarkingTools.TableCharacters.original[i])).toBe("0");
			expect(WatermarkingTools.decodeText(WatermarkingTools.TableCharacters.homoglyph[i])).toBe("1");
		});
	}
});

describe("Testing single space decoding", () => {
	for (let i = 0; i < WatermarkingTools.TableSpaces.length; i++) {
		test(`Decoding space |${WatermarkingTools.TableSpaces[i]}|`, () => {
			expect(WatermarkingTools.decodeText(WatermarkingTools.TableSpaces[i])).toBe(i.toString(2).padStart(3, "0"));
		});
	}
});

describe("Testing text encoding", () => {
	const payload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
	const originalText = ["The last decades are characterized by the easy availability of millions upon millions of digital contents that meet several kind of users’ needs both in professional activities and social", "All these platforms have introduced changes in the user habits with respect to digital contents by increasing the copying and sharing of text, audio, images, and video, namely digital contents"];
	const encodedText = ["§The ⅼast decaⅾes are charaⅽterⅰzeⅾ by the easy avaiⅼability of miⅼⅼⅰons upon miⅼlⅰons of dⅰgⅰtal ⅽontents that meet seⅴeraⅼ kinⅾ of users’ neeⅾs both in professⅰonal aⅽtⅰvⅰties anⅾ soⅽⅰal§", "§Alⅼ these platforms have introⅾuⅽeⅾ changes ⅰn the user habits wⅰth respeⅽt to digitaⅼ ⅽontents by ⅰncreasing the ⅽopying and sharⅰng of text, auⅾio, images, and ⅴiⅾeo, nameⅼy dⅰgitaⅼ ⅽontents§"];

	test("Encoding paragraph", () => {
		for (let i = 0; i < originalText.length; i++) {
			expect(WatermarkingTools.encodeText(originalText[i], payload)).toBe(encodedText[i]);
		}
	});
});

describe("Testing text decoding", () => {
	const payload = "010101000110010101111000011101000010000001110111011000010111010001100101011100100110110101100001011100100110101101101001011011";
	const originalText = ["The last decades are characterized by the easy availability of millions upon millions of digital contents that meet several kind of users’ needs both in professional activities and social", "All these platforms have introduced changes in the user habits with respect to digital contents by increasing the copying and sharing of text, audio, images, and video, namely digital contents"];
	const encodedText = ["§The ⅼast decaⅾes are charaⅽterⅰzeⅾ by the easy avaiⅼability of miⅼⅼⅰons upon miⅼlⅰons of dⅰgⅰtal ⅽontents that meet seⅴeraⅼ kinⅾ of users’ neeⅾs both in professⅰonal aⅽtⅰvⅰties anⅾ soⅽ§", "§Alⅼ these platforms have introⅾuⅽeⅾ changes ⅰn the user habits wⅰth respeⅽt to digitaⅼ ⅽontents by ⅰncreasing the ⅽopying and sharⅰng of text, auⅾio, images, and ⅴiⅾeo, nameⅼy dⅰgitaⅼ ⅽontents§"];

	test("Decoding paragraph", () => {
		for (let i = 0; i < originalText.length; i++) {
			expect(WatermarkingTools.decodeText(encodedText[i])).toBe(payload);
		}
	});
});
