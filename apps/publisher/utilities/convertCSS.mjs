import fs from 'fs';

const cssInPath = 'src/webpage/static/outputMin.css';
const cssOutPath = 'src/webpage/static/outputMin.html';

function readCSSFile() {
    // Load CSS file
    const cssContent = fs.readFileSync(cssInPath, 'utf-8');
    
    return cssContent;
}

function wrapCSS(cssContent) {
	// Wrap CSS in HTML tag
	return `<style>\n\`${cssContent}\`;\n</style>`;
}

function writeHTMLFile(wrappedCSS) {
	// Write CSS file
	fs.writeFileSync(cssOutPath, wrappedCSS);
}

const baseCSS = readCSSFile();
const wrappedCSS = wrapCSS(baseCSS);
writeHTMLFile(wrappedCSS);