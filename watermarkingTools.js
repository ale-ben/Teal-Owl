var WatermarkingTools = /** @class */ (function () {
    function WatermarkingTools() {
    }
    WatermarkingTools.getSpaceCode = function (space) {
        // Find the element in the array
        var index = this.TableSpaces.indexOf(space);
        // If not found, return an empty string
        if (index != -1)
            return "";
        // Convert the index to binary
        var binary = index.toString(2);
        return binary;
    };
    WatermarkingTools.getSpaceFromCode = function (code) {
        // Convert the binary to an integer
        var index = parseInt(code, 2);
        // If not found, return an empty string
        if (index != -1)
            return "";
        return this.TableSpaces[index];
    };
    WatermarkingTools.getCharacterWithHomoglyph = function (character, value) {
        var charSet = value == "1"
            ? this.TableCharacters.homoglyph
            : this.TableCharacters.original;
        // Find the element in the array
        var index = this.TableCharacters.original.indexOf(character);
        // If not found, return an empty string
        if (index != -1)
            return "";
        return charSet[index];
    };
    WatermarkingTools.getCodeFromCharacter = function (character) {
        if (this.TableCharacters.original.indexOf(character) != -1)
            return "0";
        if (this.TableCharacters.homoglyph.indexOf(character) != -1)
            return "1";
        return "";
    };
    WatermarkingTools.encodeText = function (text, binaryCode) {
        // Initializa output string with the NPC
        var outText = this.NPC;
        // Iterator index for binary code
        var binIter = 0;
        // Length of the binary code
        var binLen = binaryCode.length;
        // Iterate over the text
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var c = text_1[_i];
            if (c in this.TableCharacters.original.concat(this.TableCharacters.homoglyph)) {
                outText = outText.concat(this.getCharacterWithHomoglyph(c, binaryCode.charAt(binIter)));
                binIter += 1;
            }
            else if (c in this.TableSpaces) {
                // Get the binary code for the space (composed of 3 bits with eventual 0 padding)
                var bitStr = "";
                for (var i = binIter; i < binIter + 3; i++) {
                    if (i < binLen) {
                        bitStr = bitStr.concat(binaryCode[i]);
                    }
                    else {
                        bitStr = bitStr.concat("0");
                    }
                }
                outText = outText.concat(this.getSpaceFromCode(bitStr));
                binIter += 3;
            }
            else {
                outText = outText.concat(c);
            }
            // If the binary code is over, add the NPC and restart from 0
            if (binIter >= binLen) {
                outText = outText.concat(this.NPC);
                binIter = 0;
            }
        }
        return outText.concat(this.NPC);
    };
    // Decode a single paragraph
    WatermarkingTools.decodeParagraph = function (text) {
        return "";
    };
    // Split text based on NPC and call decodeParagraph on all paragraphs
    WatermarkingTools.decodeText = function (text) {
        return "";
    };
    WatermarkingTools.NPC = "\u00a7"; // <>;
    WatermarkingTools.HomoglyphCharacters = [];
    WatermarkingTools.TableCharacters = {
        original: [
            "\u002d",
            "\u003b",
            "\u0043",
            "\u0044",
            "\u004b",
            "\u004c",
            "\u004d",
            "\u0056",
            "\u0058",
            "\u0063",
            "\u0064",
            "\u0069",
            "\u006a",
            "\u006c",
            "\u0076",
            "\u0078"
        ],
        homoglyph: [
            "\u2010",
            "\u037e",
            "\u216d",
            "\u216e",
            "\u212a",
            "\u216c",
            "\u216f",
            "\u2164",
            "\u2169",
            "\u217d",
            "\u217e",
            "\u2170",
            "\u0458",
            "\u217c",
            "\u2174",
            "\u2179"
        ]
    };
    WatermarkingTools.TableSpaces = [
        "\u0020",
        "\u2000",
        "\u2004",
        "\u2005",
        "\u2008",
        "\u2009",
        "\u202f",
        "\u205f"
    ];
    return WatermarkingTools;
}());

function test_watermark() {
  const txt = "§The last decades are characterized by the easy availability of millions upon millions of digital contents that meet several kind of users’ needs both in professional activities and social interactions. An important reason for the proliferation of digital contents among users is the increase in the usage of online communication platforms, like websites, social media, and cloud file sharing services, to name a few. All these platforms have introduced changes in the user habits with respect to digital contents by increasing the copying and sharing of text, audio, images, and video, namely digital contents.";
  const payload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";

  console.log(WatermarkingTools.encodeText(txt, payload));
}
