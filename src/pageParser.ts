interface WMParagraph {
	id: string;
	openTag: Element | undefined;
	subTags: WMSubParagraph[] | undefined;
	status: number;
}

interface WMSubParagraph {
	id: string;
	openTag: Element | undefined;
	status: number;
}

/*
 * Status codes:
 * 0 - Empty
 * 1 - Parsed
 * 1 - Validated
 * 3 - Showing
 */

let wmParagraphs: WMParagraph[] = [];

/**
 * Entrypoint for the page parser, called by onClicked event in background.ts
 */
export function toggleReader() {
	let status: number;

	// Check if meta tag exists
	let meta = document.head.getElementsByTagName('watermarking-meta')[0];

	// If meta tag exists, check and update status
	if (meta) {
		status = getStatus(meta);
	} else {
		meta = document.createElement('watermarking-meta');
		document.head.appendChild(meta);
		status = setStatus(meta, 0);
	}

	switch (status) {
		case 1:
			// TODO
			break;
		case 2:
			// TODO
			break;
		case 3:
			// TODO
			break;
		default:
			// Page has not been parsed yet
			parsePage();
			setStatus(meta, 1);
			break;
	}
}

/**
 * Reads the status tag from header and returns the status code
 * @param meta the watermarking-meta tag
 * @returns the status code of the page (0-3) or 0 if no status tag exists
 */
function getStatus(meta: Element): number {
	const metaStatus = meta.getElementsByTagName('status')[0]?.textContent;
	if (metaStatus) {
		return parseInt(metaStatus);
	}
	return 0;
}

/**
 * Writes the status tag to header and returns the status code
 * @param meta the watermarking-meta tag
 * @param status the status code of the page (0-3)
 * @returns the status code of the page (0-3)
 */
function setStatus(meta: Element, status: number): number {
	//FIXME: If status already exists, DO NOT RECREATE IT
	const stat = document.createElement('status');
	stat.textContent = status.toString();
	meta.appendChild(stat);
	return status;
}

/**
 * Parses the page and adds watermarking tags
 */
function parsePage() {
	const body = document.body.innerHTML;

	// This will contain the new body with watermarking tags
	let newBody = '';

	// Index of last character added to newBody
	let lastIndex = 0;

	// Index of watermarking tag
	let wmIndex = 0;

	// Non Printable Character used to separate paragraphs
	const NPC = '§';

	// Find first NPC in body
	let beginIndex = body.indexOf(NPC);
	while (beginIndex !== -1) {
		// Find closing NPC
		const endIndex = body.indexOf(NPC, beginIndex + 1);

		// If no closing NPC is found, break
		if (endIndex === -1) break;

		// Save everything new preceding NPC in newBody
		newBody += body.substring(lastIndex, beginIndex);

		// Update lastIndex to current end index
		lastIndex = endIndex + 1;

		// Parse string between NPC and add to newBody
		const tmp = body.substring(beginIndex, endIndex + 1);
		newBody += parseString(tmp, wmIndex);

		// Increment wmIndex
		wmIndex += 1;

		// Find next opening NPC
		beginIndex = body.indexOf(NPC, endIndex + 1);
	}

	// Add everything after last NPC to newBody
	newBody += body.substring(lastIndex, body.length);

	// Replace body with newBody
	document.body.innerHTML = newBody;
}

/**
 * Parses a string and adds watermarking tags. if string contains multiple paragraphs, it will be split and parsed
 * @param paragraph The string to parse
 * @param wmIndex The index of the watermarking tag
 * @returns The parsed string
 */
export function parseString(paragraph: string, wmIndex: number): string {
	// Create new paragraph object and add it to wmParagraphs
	const parStruct: WMParagraph = {
		id: 'watermark-' + wmIndex + '-0',
		openTag: undefined,
		subTags: undefined,
		status: 0
	};
	wmParagraphs.push(parStruct);

	// Index of the last subparagraph added to newString
	let subParIndex = 1;
	let newString = '';
	/*
		Idea: Count HTML opening and closing tags in paragraph, if they are equal than no need for parsing (with some exceptions).
		Opening tag regex: <[^/][^>]*(?<!\/)>
		Closing tag regex: <\/[^>]+>

		Exceptions: 
		- If we find a closing tag before the first opening tag, counting is useless (example: ... </p> ... <p> ... </p> ... <p> ... this is balanced but should be escaped anyway)
		- If we find an opening tag after the last closing tag
	*/

	const openingTagRegex = /<[^/][^>]*(?<!\/)>/g;
	const closingTagRegex = /<\/[^>]+>/g;

	// Count opening and closing tags
	const openingTags = paragraph.match(openingTagRegex);
	const closingTags = paragraph.match(closingTagRegex);

	const openingTagsLength = openingTags ? openingTags.length : 0;
	const closingTagsLength = closingTags ? closingTags.length : 0;

	if (openingTagsLength === closingTagsLength) {
		// Need to check exceptions

		if (openingTags && closingTags) {
			// Get index of first opening tag and first closing tag
			const firstOpeningTag = paragraph.indexOf(openingTags[0]);
			const firstClosingTag = paragraph.indexOf(closingTags[0]);

			let lastIndex = 0;

			if (firstOpeningTag > firstClosingTag) {
				// First closing tag is before first opening tag, need to wrap closing tag

				// Add everything before first closing tag to newString
				newString = paragraph.substring(0, firstClosingTag);

				// Add closing tag to newString
				newString += '</mark>';

				// Add actual tag to newString
				newString += closingTags[0];

				// Add opening tag to newString
				newString +=
					'<mark class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined,
					status: 0
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Update lastIndex to current index
				lastIndex = firstClosingTag + closingTags[0].length;
			}

			// Get index of last opening tag and last closing tag
			const lastOpeningTag = paragraph.lastIndexOf(
				openingTags[openingTagsLength - 1]
			);
			const lastClosingTag = paragraph.lastIndexOf(
				closingTags[closingTagsLength - 1]
			);

			if (lastOpeningTag > lastClosingTag) {
				// Last opening tag is after last closing tag, need to wrap opening tag

				// Add everything after last tag end before last opening tag to newString
				newString += paragraph.substring(lastIndex, lastOpeningTag);

				// Add closing tag to newString
				newString += '</mark>';

				// Add actual tag to newString
				newString += openingTags[openingTagsLength - 1];

				// Add opening tag to newString
				newString +=
					'<mark class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined,
					status: 0
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Update lastIndex to current index
				lastIndex =
					lastOpeningTag + openingTags[openingTagsLength - 1].length;
			}

			// Add everything after last tag end to newString
			newString += paragraph.substring(lastIndex, paragraph.length);
		} else {
			newString += paragraph;
		}
	} else {
		// Paragraph contains subparagraphs with at least one unbalanced tag

		const difference = Math.abs(openingTagsLength - closingTagsLength);
		let lastIndex: number;

		if (openingTagsLength > closingTagsLength) {
			// Paragraph contains more opening tags than closing tags
			lastIndex = 0;

			// Find "difference" opening tags and wrap them with mark tags
			for (let i = 0; i < difference; i += 1) {
				// Find next opening tag and get index of beginning and end of tag
				const beginIndex = paragraph.indexOf('<', lastIndex);
				const endIndex = paragraph.indexOf('>', lastIndex);

				// Save everything preceding opening tag in newString
				newString += paragraph.substring(lastIndex, beginIndex);

				// Add opening tag to newString
				newString +=
					'<mark class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined,
					status: 0
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Add actual tag to newString
				newString += paragraph.substring(beginIndex, endIndex + 1);

				// Add closing tag to newString
				newString += '</mark>';

				// Increase lastIndex to current index
				lastIndex = endIndex + 1;
			}

			// Add everything after last opening tag to newString
			newString += paragraph.substring(lastIndex, paragraph.length);
		} else {
			// Paragraph contains more closing tags than opening tags
			lastIndex = paragraph.length;

			// Find "difference" closing tags and wrap them with mark tags
			for (let i = 0; i < difference; i += 1) {
				// Find previous closing tag and get index of beginning and end of tag
				const beginIndex = paragraph.lastIndexOf('<', lastIndex);
				const endIndex = paragraph.lastIndexOf('>', lastIndex);

				// Save everything after closing tag in newString
				newString =
					paragraph.substring(endIndex + 1, lastIndex) + newString;

				// Add opening tag to newString
				newString =
					'<mark class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">' +
					newString;

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined,
					status: 0
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Add actual tag to newString
				newString =
					paragraph.substring(beginIndex, endIndex + 1) + newString;

				// Add closing tag to newString
				newString = '</mark>' + newString;

				// Increase lastIndex to current index
				lastIndex = beginIndex;
			}

			// Add everything before first closing tag to newString
			newString = paragraph.substring(0, lastIndex) + newString;
		}
	}

	// Add external marks
	// Add opening tag to newString
	newString =
		'<mark class="watermark-marktag" id="watermark-' +
		wmIndex +
		'-0">' +
		newString;

	newString += '</mark>';
	return removeEmptyTags(newString);
}

function removeEmptyTags(str: string): string {
	// Regular expression to match mark tags that have no content
	const emptyTagRegex =
		/<mark[^<]*id="watermark-(\d+)-(\d+)"[^>]*(?<!\/)>[\s\n\t\t]*<\/mark>/;

	// Find all empty tags
	let emptyTag = str.match(emptyTagRegex);

	// Remove empty opening tags
	while (emptyTag) {
		console.log(emptyTag)
		const [fullMatch, wmIndex, subParIndex] = emptyTag;

		// Delete empty tag from WMParagraphs
		if (subParIndex === '0') {
			// Delete entire paragraph
			console.log("Deleting paragraph", wmIndex);
			wmParagraphs = wmParagraphs.filter(
				(el) => el.id !== `watermark-${wmIndex}-0`
			);
		} else {
			// Delete sub paragraph
			console.log("Deleting sub paragraph", wmIndex, subParIndex);
			wmParagraphs = wmParagraphs.map((el) => {
				if (el.id !== `watermark-${wmIndex}-0`) return el;
				else {
					return {
						...el,
						subTags: el.subTags?.filter(
							(subEl) =>
								subEl.id !==
								`watermark-${wmIndex}-${subParIndex}`
						)
					};
				}
			});
		}

		// Delete empty tag
		console.log("Deleting empty tag", fullMatch)
		str = str.replace(fullMatch, '');
		emptyTag = str.match(emptyTagRegex);
	}

	return str;
}
