import {Utils} from "./Utils";

function onOpen() {
	var ui = DocumentApp.getUi();
	ui.createMenu("Watermarking Tools").addSubMenu(ui.createMenu("Apply watermark").addItem("Apply and export to PDF", "applyExportPDFButton")).addSeparator().addItem(
		"Config",
		"openConfigButton"
	).addToUi();
}

function applyExportPDFButton() {
	const outFile = Utils.applyExport(DocumentApp.getActiveDocument());
	DocumentApp.getUi().alert("Watermark applied correctly. Output file: " + outFile.getName() + ". Location: " + outFile.getUrl());
}

function openConfigButton() {
	DocumentApp.getUi(). // Or DocumentApp or FormApp.
	alert("This should open config popup");
}
