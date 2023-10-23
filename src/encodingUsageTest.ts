import { encodeText } from "./watermarkingTools";

const text = `Deserunt nulla dolor incididunt fugiat culpa aliquip. Laborum reprehenderit sunt nisi id laboris dolor occaecat aliquip irure aliquip. Labore laborum culpa adipisicing eiusmod commodo. Est magna enim laborum ullamco eu amet nisi. Consequat aute enim magna nisi minim pariatur consequat nostrud aute et ex. Incididunt commodo sunt veniam sit aute cupidatat sunt excepteur ipsum cillum magna.

Excepteur aute amet aliquip pariatur nulla. Lorem consectetur pariatur reprehenderit veniam ea qui culpa sunt enim. Elit et culpa ex enim consequat nostrud excepteur sit ullamco duis veniam fugiat fugiat ex. Dolor qui eu ea non magna quis incididunt eu officia commodo. Nisi qui esse enim ipsum culpa Lorem enim nostrud ut nisi. Labore ullamco enim deserunt id dolor velit Lorem veniam mollit nulla ad anim quis duis. Do aliquip minim minim fugiat.

Ad labore culpa nisi non eu cupidatat reprehenderit adipisicing do quis aliquip adipisicing aliquip et. Amet est commodo ipsum ad anim amet nulla sit dolor amet dolor magna nulla elit. Laborum ullamco irure officia ad minim enim excepteur fugiat non incididunt amet amet laborum. Non ipsum magna irure adipisicing elit consectetur amet voluptate ex esse eiusmod eiusmod labore incididunt. Commodo duis minim commodo proident id cillum nulla est pariatur commodo in nisi anim.

Duis nulla aliqua ullamco Lorem sit ex adipisicing esse veniam adipisicing eiusmod minim commodo. Officia enim magna amet nisi magna ad velit aliquip sunt elit in magna et. Eu exercitation cillum amet laborum pariatur consectetur laboris non Lorem enim dolor do non. Consectetur quis eiusmod occaecat occaecat dolor ex deserunt qui et voluptate ipsum irure ut cillum. Amet aute ullamco consectetur amet est commodo deserunt. Nisi ex labore ullamco aliquip.`;

const payload = "0110011101";

const encoded = encodeText(text, payload);

console.log(encoded);