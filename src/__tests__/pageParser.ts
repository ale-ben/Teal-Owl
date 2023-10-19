import { parseString } from '../pageParser';

test('parseString §Hello world§', () => {
	expect(parseString('§Hello world§', 0)).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Hello world§</mark>'
	);
});

test('parseString §Hello <p>world§', () => {
	expect(parseString('§Hello <p>world§', 0)).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Hello <mark class="watermark-marktag" id="watermark-0-1"><p></mark>world§</mark>'
	);
});

test('parseString §Hello </p>world§', () => {
	expect(parseString('§Hello </p>world§', 0)).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Hello </mark></p><mark class="watermark-marktag" id="watermark-0-1">world§</mark>'
	);
});
