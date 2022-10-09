const watermarkingTools = require('./watermarkingTools');

test('Single character encode 0 bit', () => {
	for (let key in watermarkingTools.encodeTableChar) {
		expect(watermarkingTools.encodeChar(key, '0')).toBe(key);
	}
});

test('Single character encode 1 bit', () => {
	for (let key in watermarkingTools.encodeTableChar) {
		expect(watermarkingTools.encodeChar(key, '1')).toBe(watermarkingTools.encodeTableChar[key]);
	}
});

test('Space encode', () => {
	for (let i = 0; i < watermarkingTools.spacesArr.length; i++) {
		expect(watermarkingTools.encodeSpace(i.toString(2).padStart(3, '0'))).toBe(watermarkingTools.spacesArr[i]);
	}
});

test('Single character decode 0 bit', () => {
	for (let key in watermarkingTools.encodeTableChar) {
		expect(watermarkingTools.decodeChar(key)).toBe('0');
	}
});

test('Single character decode 1 bit', () => {
	for (let key in watermarkingTools.decodeTableChar) {
		expect(watermarkingTools.decodeChar(key)).toBe('1');
	}
});

test('Space decode', () => {
	for (let i = 0; i < watermarkingTools.spacesArr.length; i++) {
		expect(watermarkingTools.decodeSpace(watermarkingTools.spacesArr[i])).toBe(i.toString(2).padStart(3, '0'));
	}
});

test('Decode encoded char', () => {
	for (let key in watermarkingTools.encodeTableChar) {
		expect(watermarkingTools.decodeChar(watermarkingTools.encodeChar(key, '0'))).toBe('0');
		expect(watermarkingTools.decodeChar(watermarkingTools.encodeChar(key, '1'))).toBe('1');
	}
});