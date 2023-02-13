import { Utils } from "./Utils";

function onOpen() {
	var ui = DocumentApp.getUi();
	ui.createMenu("Watermarking Tools").addSubMenu(ui.createMenu("Apply watermark").addItem("Apply and export to PDF", "applyExportPDFButton")).addSeparator().addItem("Config", "openConfigButton").addToUi();
}

function applyExportPDFButton() {
	Utils.applyExportPDF(DocumentApp.getActiveDocument());
	DocumentApp.getUi().alert("Watermark applied correctly");
}

function openConfigButton() {
	DocumentApp.getUi(). // Or DocumentApp or FormApp.
	alert("This should open config popup");
}
