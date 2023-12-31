import { sha256 } from 'js-sha256';

function prepareText(text: string): string {
	const charsToRemove = ['\n', '\r', '\t'];

	charsToRemove.forEach((char) => {
		text = text.replace(char, '');
	});

	return text;
}

export function hashText(text: string): string {
	return sha256(prepareText(text));
}