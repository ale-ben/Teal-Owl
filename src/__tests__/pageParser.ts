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

test('parseString §Hello <i>world</i>§', () => {
	expect(parseString('§Hello <i>world</i>§', 0)).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Hello <i>world</i>§</mark>'
	);
});

test('parseString §Hello </p>world<p>§', () => {
	expect(parseString('§Hello </p>world<p>§', 0)).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Hello </mark></p><mark class="watermark-marktag" id="watermark-0-1">world</mark><p><mark class="watermark-marktag" id="watermark-0-2">§</mark>'
	);
});

test('parseString §Prova</h1><p>The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §', () => {
	expect(
		parseString(
			'§Prova</h1><p>The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §',
			0
		)
	).toBe(
		'<mark class="watermark-marktag" id="watermark-0-0">§Prova</mark></h1><p><mark class="watermark-marktag" id="watermark-0-2">The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §</mark>'
	);
});
