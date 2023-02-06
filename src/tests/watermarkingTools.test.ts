import { WatermarkingTools } from "../watermarkingTools";

describe('Testing single character encoding', () => {
	for (let i = 0; i < WatermarkingTools.TableCharacters.original.length; i++) {
		test(`Encoding character ${WatermarkingTools.TableCharacters.original[i]}`, () => {
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableCharacters.original[i], "0")).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableCharacters.original[i]}${WatermarkingTools.NPC}`);
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableCharacters.original[i], "1")).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableCharacters.homoglyph[i]}${WatermarkingTools.NPC}`);
		});
	}

	for (let i = 0; i < WatermarkingTools.TableSpaces.length; i++) {
		test(`Encoding space ${WatermarkingTools.TableSpaces[i]}`, () => {
			expect(WatermarkingTools.encodeText(WatermarkingTools.TableSpaces[0], i.toString(2).padStart(3, '0'))).toBe(`${WatermarkingTools.NPC}${WatermarkingTools.TableSpaces[i]}${WatermarkingTools.NPC}`);
		});
	}
});