function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Watermarking Tools')
      .addSubMenu(ui.createMenu('Apply watermark')
          .addItem('Apply and export to PDF', 'applyExportPDFButton'))
      .addSeparator()
      .addItem('Config', 'openConfigButton')
      .addToUi();
}

function applyExportPDFButton() {
  DocumentApp.getUi() // Or DocumentApp or FormApp.
     .alert('This should apply the watermarking and export as PDF to google drive');
  applyExportPDF(DocumentApp.getActiveDocument());
}

function openConfigButton() {
  DocumentApp.getUi() // Or DocumentApp or FormApp.
     .alert('This should open config popup');
}