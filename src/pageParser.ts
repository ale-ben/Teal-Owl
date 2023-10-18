// interface WMParagraph {
// 	begin: Element;
// 	status: number;
// 	crossParagraph: WMParagraph | undefined;
// }

/*
 * Status codes:
 * 0 - Empty
 * 1 - Parsed
 * 1 - Validated
 * 3 - Showing
 */

/**
 * Reads the status tag from header and returns the status code
 * @param meta the watermarking-meta tag
 * @returns the status code of the page (0-3) or 0 if no status tag exists
 */
function getStatus(meta: Element): number {
	console.log('getStatus', meta);
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
	console.debug('setStatus', meta, status);
	const stat = document.createElement('status');
	stat.textContent = status.toString();
	meta.appendChild(stat);
	return status;
}

/**
 * Entrypoint for the page parser, called by onClicked event in background.ts
 */
export function toggleReader() {
	console.log('toggleReader');
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
			//setStatus(meta, 1);
			break;
	}
}

function parsePage() {
	console.log('parsePage');
	const body = document.body.innerHTML;

	// This will contain the new body with watermarking tags
	let newBody = '';

	// Index of last character added to newBody
	let lastIndex = 0;

	// Boolean to control wether to add open or close tag
	let newPar: boolean = true;

	// Index of watermarking tag
	let wmIndex = 0;

	// Non Printable Character used to separate paragraphs
	const NPC = '§';

	for (let index = 0; index < body.length; index += 1) {
		// If you find a NPC, add a watermarking tag
		if (body[index] === '§') {
			// Save everything preceding NPC in newBody
			if (index > 0) {
				newBody += body.substring(lastIndex, index);
			}

			// Add watermarking tag (newPar determines if open or close tag)
			if (newPar) {
				// Add open tag, increment wmIndex and set newPar to false
				newBody +=
					'<mark class="watermark-marktag" id="watermark-' +
					wmIndex +
					'">' +
					NPC;
				wmIndex += 1;
				newPar = false;
			} else {
				// Add close tag and set newPar to true
				newBody += NPC + '</mark>';
				newPar = true;
			}
			// Update lastIndex to current index
			lastIndex = index + 1;
		}
	}

	// Add everything after last NPC to newBody
	newBody += body.substring(lastIndex, body.length);

	// Replace body with newBody
	document.body.innerHTML = newBody;
}
