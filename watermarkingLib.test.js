const watermarkingTools = require('./watermarkingLib');

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

//TODO: Full text watermarking 
xtest('Encode and decode full text', () => {
	let text = "Pellentesque mattis efficitur augue. Maecenas eget egestas leo. Aliquam augue ex, pharetra sodales nisl quis, laoreet vehicula quam. Nam tincidunt eros vitae lacus bibendum, non aliquet ante cursus. Nam tristique magna vitae libero rutrum convallis. Curabitur augue sem, porta vitae nulla id, dapibus porttitor ligula. Aliquam eleifend est quam, sit amet imperdiet nunc vestibulum vitae. Nunc accumsan fringilla neque et lacinia. Cras auctor nec ex a lobortis. Nulla a massa nec mauris pulvinar fermentum. Morbi placerat vitae dui posuere commodo.";
	let binCode = "0101010001100101011000010110110000100000010011110111011101101100"
});