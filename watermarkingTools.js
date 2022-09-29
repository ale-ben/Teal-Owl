// Non Printable Character used as a delimiter
//const NPC = '\u200b' // Zero Width Space
const NPC = '<>' // <>;

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
  
  // Homoglyph spaces encoding
  const encodeTableSpace = [
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
  const newChar = encodeTableSpace[parseInt(bit,2)];
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
    } else if (c === encodeTableSpace[0]) {
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

function test(){
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod pulvinar ipsum. Nunc quis dictum nunc. Sed ac turpis non justo ornare tempus eget a eros. Nam vitae mi sed quam mattis eleifend in sit amet enim. Cras pharetra eget tellus vitae commodo. Ut eu libero iaculis, elementum quam a, tempor massa. Nunc in lectus eu risus commodo tristique. Donec feugiat, lorem nec gravida iaculis, eros nulla vulputate arcu, ac tristique tortor arcu non erat. Donec diam lorem, egestas eget feugiat sed, pharetra at purus. Aliquam erat volutpat. Vivamus fringilla tellus bibendum lectus feugiat, vitae imperdiet nisi venenatis.";
  const payload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
  console.log(encodeText(text,payload))
}