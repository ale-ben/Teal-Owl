function doGet(e:any) {
  var params = JSON.stringify(e);
  return HtmlService.createHtmlOutput(params);
}