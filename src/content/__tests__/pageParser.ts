import { parseString } from "../pageParser";

test("parseString §Hello world§", () => {
  expect(parseString("§Hello world§", 0)).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Hello world§</wm>'
  );
});

test("parseString §Hello <p>world§", () => {
  expect(parseString("§Hello <p>world§", 0)).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Hello <wm class="watermark-marktag" id="watermark-0-1"><p></wm>world§</wm>'
  );
});

test("parseString §Hello </p>world§", () => {
  expect(parseString("§Hello </p>world§", 0)).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Hello </wm></p><wm class="watermark-marktag" id="watermark-0-1">world§</wm>'
  );
});

test("parseString §Hello <i>world</i>§", () => {
  expect(parseString("§Hello <i>world</i>§", 0)).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Hello <i>world</i>§</wm>'
  );
});

test("parseString §Hello </p>world<p>§", () => {
  expect(parseString("§Hello </p>world<p>§", 0)).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Hello </wm></p><wm class="watermark-marktag" id="watermark-0-1">world</wm><p><wm class="watermark-marktag" id="watermark-0-2">§</wm>'
  );
});

test("parseString §Prova</h1><p>The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §", () => {
  expect(
    parseString(
      "§Prova</h1><p>The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §",
      0
    )
  ).toBe(
    '<wm class="watermark-marktag" id="watermark-0-0">§Prova</wm></h1><p><wm class="watermark-marktag" id="watermark-0-2">The last decaⅾes are charaⅽterⅰzed by the easy avaⅰⅼability of milⅼions upon millⅰons of dⅰgⅰtal contents that meet seⅴeraⅼ kind of users’ neeⅾs both §</wm>'
  );
});
