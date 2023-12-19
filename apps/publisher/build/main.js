/**
 * Non printable character used to separate the paragraphs
 */
const NPC = '\u00a7'; // <>; TODO: Change this to the real NPC
/**
 * Conversion table for characters and their homoglyphs
 */
const TableCharacters = {
  original: ['\u002d', '\u003b', '\u0043', '\u0044', '\u004b', '\u004c', '\u004d', '\u0056', '\u0058', '\u0063', '\u0064', '\u0069', '\u006a', '\u006c', '\u0076', '\u0078'],
  homoglyph: ['\u2010', '\u037e', '\u216d', '\u216e', '\u212a', '\u216c', '\u216f', '\u2164', '\u2169', '\u217d', '\u217e', '\u2170', '\u0458', '\u217c', '\u2174', '\u2179']
};
/**
 * Conversion table for spaces
 */
const TableSpaces = ['\u0020', '\u2000', '\u2004', '\u2005', '\u2008', '\u2009', '\u202f', '\u205f'];
/**
 * Given a space, returns the binary code it represents (if any)
 * @param space The space to get the code from
 * @returns The binary code represented by the space as a string
 */
function getSpaceCode(space) {
  // Find the element in the array
  const index = TableSpaces.indexOf(space);
  // If not found, return an empty string
  if (index == -1) {
    console.warn('Trying to get the code of a space that is not in the table');
    return '';
  }
  // Convert the index to binary
  const binary = index.toString(2).padStart(3, '0');
  return binary;
}
/**
 * Given a binary code, returns the space it represents (if any)
 * @param code The binary code to get the space from (composed of 3 bits)
 * @returns The space represented by the binary code
 */
function getSpaceFromCode(code) {
  // Convert the binary to an integer
  const index = parseInt(code, 2);
  // If not found, return an empty string
  if (index == -1) {
    console.warn('Trying to get the space from a code that is not in the table');
    return '';
  }
  return TableSpaces[index];
}
/**
 * Given a character and a value, returns the homoglyph of the character according to the binary value
 * @param character The character to apply the homoglyph to
 * @param value The binary value to apply to the character
 * @returns The homoglyph of the character according to the binary value as a string
 */
function getCharacterWithHomoglyph(character, value) {
  const charSet = value == '1' ? TableCharacters.homoglyph : TableCharacters.original;
  // Find the element in the array
  const index = TableCharacters.original.indexOf(character);
  // If not found, return an empty string
  if (index == -1) {
    console.warn('Trying to apply homoglyph to a character that is not in the original set');
    return '';
  }
  return charSet[index];
}
/**
 * Given a character, returns the payload it represents (if any)
 * @param character The character to get the payload from
 * @returns The payload represented by the character
 */
function getCodeFromCharacter(character) {
  if (TableCharacters.original.includes(character)) return '0';
  if (TableCharacters.homoglyph.includes(character)) return '1';
  if (TableSpaces.includes(character)) {
    return getSpaceCode(character);
  }
  return '';
}
function encodeString(text, binaryCode, binIter = 0) {
  // Length of the binary code
  const binLen = binaryCode.length;
  // Initialize output string
  let outText = '';
  // Flag to add the NPC at the beginning of the text
  let addInitNPC = binIter === 0;
  for (const c of text) {
    if (addInitNPC) {
      outText = outText.concat(NPC);
      addInitNPC = false;
    }
    if (TableCharacters.original.includes(c)) {
      outText = outText.concat(getCharacterWithHomoglyph(c, binaryCode.charAt(binIter)));
      binIter += 1;
    } else if (TableSpaces.includes(c)) {
      // Get the binary code for the space (composed of 3 bits with eventual 0 padding)
      let bitStr = '';
      for (let i = binIter; i < binIter + 3; i++) {
        if (i < binLen) {
          bitStr = bitStr.concat(binaryCode[i]);
        } else {
          bitStr = bitStr.concat('0');
        }
      }
      outText = outText.concat(getSpaceFromCode(bitStr));
      binIter += 3;
    } else {
      outText = outText.concat(c);
    }
    // If the binary code is over, add the NPC and restart from 0
    if (binIter >= binLen) {
      outText = outText.concat(NPC);
      binIter = 0;
      addInitNPC = true;
    }
  }
  return {
    binIter: binIter,
    outText: outText
  };
}
/**
 * Split the text into paragraphs and decode each paragraph
 * @param text The text to decode
 * @returns The decoded paragraphs
 */
function decodeParagraphs(text) {
  const paragraphs = [];
  const split = text.split(NPC);
  split.forEach(par => {
    if (par.length == 0) return;
    // Initialize the output string
    const out = decodeText(par);
    if (out.payload.length == 0) return;
    paragraphs.push(out);
  });
  return paragraphs;
}
/**
 * Decodes a single paragraph
 * @param text The text to decode
 * @returns
 */
function decodeText(text, trim = true) {
  // Initialize the output string
  let outCode = '';
  let outText = '';
  // Iterate over the text
  for (const c of text) {
    const code = getCodeFromCharacter(c);
    outCode = outCode.concat(code);
    if (code == '' || code == '0') {
      outText = outText.concat(c);
    } else if (code == '1') {
      outText = outText.concat(TableCharacters.original[TableCharacters.homoglyph.indexOf(c)]);
    } else {
      outText = outText.concat(TableSpaces[0]);
    }
  }
  // Since unicode uses 8 bits for each character, the binary code must be a multiple of 8. If not, remove the last bits
  const len = outCode.length % 8;
  if (trim && len != 0) {
    // Remove the last len bits from the binary code
    outCode = outCode.substring(0, outCode.length - len);
  }
  return {
    payload: outCode,
    text: outText
  };
}

function encodeTree(tree, binaryCode) {
  // Iterator index for binary code
  let binIter = 0;
  // Iterate over the tree and apply the watermark to each text
  for (const text of tree) {
    if (text.text === undefined) continue;
    // Encode the text
    const encoded = encodeString(text.text, binaryCode, binIter);
    text.text = encoded.outText;
    binIter = encoded.binIter;
  }
}

/**
 * Generate SHA256 hash of string
 * https://stackoverflow.com/questions/59381945/how-do-i-get-google-apps-script-to-do-sha-256-encryption
 * @param value
 * @returns
 */
function Sha256Hash(value) {
  return BytesToHex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8));
}

/**
 * Convert bytes array to hex string
 * https://stackoverflow.com/questions/59381945/how-do-i-get-google-apps-script-to-do-sha-256-encryption
 * @param bytes
 * @returns
 */
function BytesToHex(bytes) {
  const hex = [];
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    let c;
    if (b < 0) {
      c = (256 + b).toString(16);
    } else {
      c = b.toString(16);
    }
    if (c.length == 1) {
      hex.push('0' + c);
    } else {
      hex.push(c);
    }
  }
  return hex.join('');
}

/**
 * Generate payload for watermarking
 * @param userID ID of the author of the document
 * @param docID ID of the document
 * @returns Payload as string
 */
function GeneratePayload(userID, docID) {
  // Base payload
  let payload = userID + ',' + docID;

  // Generarte hash of payload
  const hash = Sha256Hash(payload);

  // Add hash to payload (as string)
  payload += ',' + hash;
  console.log(hash);
  console.log(payload);
  return payload;
}
function StringToBinStr(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(2).padStart(8, '0');
  }
  return result;
}

// This is a customized version of the parser from google docs to html (https://github.com/thejimbirch/GoogleDoc2Html/tree/master) Note that original
// parser is in js, this is converted to ts


/**
 * Tree structure of the document
 */

/**
 * Main function to parse the document into a tree structure.
 * @param content The body of the document
 * @returns The root of the tree structure of the document as a TreeStruct object and an array of tree text elements.
 */
function ParseDocument(content) {
  // Queue for the elements to be parsed (See BFS algorithm)
  const parseQueue = [];
  const textElements = [];

  // Root of the tree structure
  const root = {
    content: content,
    children: [],
    type: content.getType()
  };
  parseQueue.push(root);

  // Next element in the queue
  let el;

  // Parse each element in the queue. This function will add the elements to the tree and push the childs to the queue.
  while ((el = parseQueue.shift()) != undefined) {
    parseElement(parseQueue, textElements, el);
  }
  return [root, textElements];
}

/**
 * Internal function to parse an element into a tree structure.
 * @param parseQueue Queue of elements to be parsed
 * @param elem The element to be parsed
 */
function parseElement(parseQueue, textElements, elem) {
  // Define how to parse each type of element.
  if (elem.content.getType() == DocumentApp.ElementType.PARAGRAPH) {
    const par = elem.content.asParagraph();
    for (let i = 0; i < par.getNumChildren(); i++) {
      const child = {
        content: par.getChild(i),
        children: [],
        type: par.getChild(i).getType()
      };
      elem.children.push(child);
      parseQueue.push(child);
    }
  } else if (elem.content.getType() == DocumentApp.ElementType.BODY_SECTION) {
    const par = elem.content.asBody();
    for (let i = 0; i < par.getNumChildren(); i++) {
      const child = {
        content: par.getChild(i),
        children: [],
        type: par.getChild(i).getType()
      };
      elem.children.push(child);
      parseQueue.push(child);
    }
  } else if (elem.content.getType() == DocumentApp.ElementType.TEXT) {
    elem.text = elem.content.asText().getText();
    textElements.push(elem);
  }
}

/**
 * Converts the tree structure of the document into a formatted HTML string.
 * @param tree The root of the tree structure of the document
 * @param indent Indent string to be placed before each line
 * @returns The HTML representation of the document
 */
function ConvertToHTML(tree, indent = '') {
  let html = '';
  let prefix = '';
  let suffix = '';
  switch (tree.content.getType()) {
    case DocumentApp.ElementType.BODY_SECTION:
      prefix = '<watermark>';
      suffix = '</watermark>';
      break;
    case DocumentApp.ElementType.PARAGRAPH:
      switch (tree.content.asParagraph().getHeading()) {
        case DocumentApp.ParagraphHeading.HEADING1:
          prefix = '<h1>';
          suffix = '</h1>';
          break;
        case DocumentApp.ParagraphHeading.HEADING2:
          prefix = '<h2>';
          suffix = '</h2>';
          break;
        case DocumentApp.ParagraphHeading.HEADING3:
          prefix = '<h3>';
          suffix = '</h3>';
          break;
        case DocumentApp.ParagraphHeading.HEADING4:
          prefix = '<h4>';
          suffix = '</h4>';
          break;
        case DocumentApp.ParagraphHeading.HEADING5:
          prefix = '<h5>';
          suffix = '</h5>';
          break;
        case DocumentApp.ParagraphHeading.HEADING6:
          prefix = '<h6>';
          suffix = '</h6>';
          break;
        default:
          prefix = '<p>';
          suffix = '</p>';
          break;
      }
      break;
    case DocumentApp.ElementType.TEXT:
      prefix = '';
      suffix = '';
      html += tree.text;
      break;
  }
  if (prefix != '') html += '\n' + indent + prefix + '\n';
  tree.children.forEach(child => {
    html += indent + '\t' + ConvertToHTML(child, indent + '\t');
  });
  if (suffix != '') html += '\n' + indent + suffix + '\n';
  return html;
}

/**
 * Converts an HTML string into a plain text string by removing all tags.
 * @param html The HTML string to be converted
 * @returns The plain text string
 */
function HTMLToText(html) {
  return html.replace(/<[^>]*>?/gm, '');
}

/**
 * Generates a hash list from a text. The text is split into paragraphs and homoglyphs are removed.
 * @param text The text to be converted to a hash list
 * @returns The hash list
 */
function GenerateHashList(text) {
  // Split the document into paragraphs and remove homoglyphs
  const paragraphs = decodeParagraphs(text);

  // Generate hash for each paragraph
  return paragraphs.map(par => Sha256Hash(par.text));
}

function applyWatermark$1(content, payload) {
  // Generate document tree
  const [tree, textElements] = ParseDocument(content.getBody());

  // Apply watermark
  encodeTree(textElements, payload);

  // Convert tree to HTML
  const outHTML = ConvertToHTML(tree);
  return outHTML;
}
function saveToHTMLFile(content, path, name) {
  // Generate out document
  const outFile = DriveApp.createFile(name + '.html', content, 'text/html');
  // Move to correct folder
  DriveApp.getFileById(outFile.getId()).moveTo(path);
  return outFile;
}
function saveToJSONFile(content, path, name) {
  // Generate out document
  const outFile = DriveApp.createFile(name + '.json', content, 'text/json');
  // Move to correct folder
  DriveApp.getFileById(outFile.getId()).moveTo(path);
  return outFile;
}

/* eslint @typescript-eslint/no-unused-vars: "off" */

'use strict';
function doGet() {
  try {
    return HtmlService.createTemplateFromFile('build/webpage/index').evaluate();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error', e);
    return HtmlService.createHtmlOutput('Failed with error: ' + JSON.stringify(e));
  }
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ---- Helpèr functions ----
/*
This functions will be called from the client side
*/

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */

function getOAuthToken() {
  try {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error', e);
  }
}

/**
 * Gets the user's basic info
 * @returns {Object} Basic info about the user
 */

function getBasicInfo() {
  try {
    return {
      authorID: Session.getActiveUser().getEmail(),
      home: DriveApp.getRootFolder().getId()
      // TODO (Developer) - Add more info
    };
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error', e);
  }
}
function applyWatermark(documentID, authorID, source, notes, originalDocumentID) {
  console.log('Applying watermark', documentID, authorID, source, notes, originalDocumentID);

  // Basic info and paths
  const doc = DocumentApp.openById(originalDocumentID);
  const docFolder = DriveApp.getFileById(originalDocumentID).getParents().next();
  const outFolderName = doc.getName() + '_watermarked';
  const outFileName = doc.getName() + '_watermark';
  const outManifestName = doc.getName() + '_manifest';
  const outFolder = docFolder.createFolder(outFolderName);

  // Generate the payload
  const payload = GeneratePayload(authorID, documentID);
  const payloadStr = StringToBinStr(payload);

  // Generate out html
  const outHTML = applyWatermark$1(doc, payloadStr);

  // --- Manifest ---
  // Convert HTML back to string
  const htmlStr = HTMLToText(outHTML);
  // Generate hash list
  const hashList = GenerateHashList(htmlStr);
  // Generate manifest
  const manifest = {
    version: '1.0',
    author: authorID,
    document: documentID,
    timestamp: new Date().toISOString(),
    hashList,
    source: source.replaceAll(" ", "") !== "" ? source : undefined,
    notes: notes.replaceAll(" ", "") !== "" ? notes : undefined
  };

  // Save to files
  saveToHTMLFile(outHTML, outFolder, outFileName);
  saveToJSONFile(JSON.stringify(manifest), outFolder, outManifestName);
  return {
    documents: [outFileName, outManifestName],
    outFolder: outFolderName,
    outFolderURL: outFolder.getUrl()
  };
}
