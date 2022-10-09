// Non Printable Character used as a delimiter
//const NPC = '\u200b' // Zero Width Space
const NPC = '_' // <>;

// Homoglyph character encoding
const encodeTableChar = {
	'\u002d':'\u2010', // - 
	'\u003b':'\u037e', // ;
	'\u0043':'\u216d', // C
	'\u0044':'\u216e', // D
	'\u004b':'\u212a', // K
	'\u004c':'\u216c', // L
	'\u004d':'\u216f', // M
	'\u0056':'\u2164', // V
	'\u0058':'\u2169', // X
	'\u0063':'\u217d', // c
	'\u0064':'\u217e', // d
	'\u0069':'\u2170', // i
	'\u006a':'\u0458', // j
	'\u006c':'\u217c', // l
	'\u0076':'\u2174', // v
	'\u0078':'\u0006', // x
  }

  // Homoglyph character decoding
  // TODO: Can it be optimized with only one map for encode and decode?
const decodeTableChar = {
	'\u2010':'\u002d', // - 
	'\u037e':'\u003b', // ;
	'\u216d':'\u0043', // C
	'\u216e':'\u0044', // D
	'\u212a':'\u004b', // K
	'\u216c':'\u004c', // L
	'\u216f':'\u004d', // M
	'\u2164':'\u0056', // V
	'\u2169':'\u0058', // X
	'\u217d':'\u0063', // c
	'\u217e':'\u0064', // d
	'\u2170':'\u0069', // i
	'\u0458':'\u006a', // j
	'\u217c':'\u006c', // l
	'\u2174':'\u0076', // v
	'\u0006':'\u0078', // x
  }
  
  // Homoglyph spaces
  const spacesArr = [
	'\u0020',
	'\u2000',
	'\u2004',
	'\u2005',
	'\u2008',
	'\u2009',
	'\u202f',
	'\u205f',
  ]

function encodeChar(char, bit) {
  // Normal char handler
  if (bit === '0') {
    return char
  } else {
    return encodeTableChar[char]
  }
}

function encodeSpace(bit){
  // Space char
  const newChar = spacesArr[parseInt(bit,2)];
  //console.log("Space " + bit + "-" + newChar + "-")
  return newChar
}

function encodeText(text, binaryCode) {
  var outText = "".concat(NPC) // TODO: Posso usare solo NPC?
  var binIter = 0
  const binLen = binaryCode.length
  for (const c of text) {
    if (c in encodeTableChar) {
      outText = outText.concat(encodeChar(c, binaryCode.charAt(binIter)))
      binIter++
    } else if (c === spacesArr[0]) {
      var bitStr = ""
      for (let i = binIter; i < binIter+3; i++) { 
        if (i<binLen) {
          bitStr = bitStr.concat(binaryCode[i])
        } else {
          bitStr = bitStr.concat('0')
        }
      } 
      outText = outText.concat(encodeSpace(bitStr))
      binIter += 3
    } else {
      outText = outText.concat(c)
    }
    
    if (binIter >= binLen) {
      outText = outText.concat(NPC)
      binIter = 0
    }
  }
  return outText
}

function decodeChar(char, bit) {
	// Normal char handler
	if (char in encodeTableChar) return '0';
	if (char in decodeTableChar) return '1';
	return '';
  }
  
  function decodeSpace(char){
	// Space char
	const spacePos = spacesArr.indexOf(char);
	if (spacePos == -1) return '';
	return spacePos.toString(2);
  }

function decodeText(text) {
	var outCode = ""
	
	for (const c of text) {
		outCode = outCode.concat(decodeChar(c));
		if (c in spacesArr) outCode = outCode.concat(decodeSpace(c));
		if (c === NPC) outCode = outCode.concat(NPC);
	}
	return outCode
  }

function test(){
  const text = "ccc ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc";
  const payload = "010101000110";
  console.log(encodeText(text,payload))
  console.log(payload);
  console.log(decodeText(encodeText(text,payload)));
}

if (require.main === module) {
	test();
}

if (process.env.NODE_ENV === 'test') {
	module.exports = {
		encodeTableChar: encodeTableChar,
		decodeTableChar: decodeTableChar,
		spacesArr: spacesArr,
		encodeChar: encodeChar,
		decodeChar: decodeChar,
		encodeSpace: encodeSpace,
		decodeSpace: decodeSpace,
		encodeText: encodeText,
		decodeText: decodeText,
	};
} else {
	module.exports = {
		encodeText: encodeText,
		decodeText: decodeText,
	};
}