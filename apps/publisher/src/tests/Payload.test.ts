import { BinStrToString, StringToBinStr } from '../Payload';

function randSTR(length: number): string {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_,;.:?!()[]{}@#$%&*+=|/<>';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
		counter += 1;
	}
	return result;
}

describe('Testing Payload encoding and decoding', () => {
	// Generate random payload length between 20 and 100
	const payloadLength = Math.floor(Math.random() * 100 + 20);

	// Generate random payload with length payloadLength
	const originalPayload = randSTR(payloadLength);

	// Encode payload
	const encodedPayload = StringToBinStr(originalPayload);

	// Decode payload
	const decodedPayload = BinStrToString(encodedPayload);

	// Compare original payload with decoded payload
	test('Decoding payload', () => {
		expect(decodedPayload).toBe(originalPayload);
	});
});
