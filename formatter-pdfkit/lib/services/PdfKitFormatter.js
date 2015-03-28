(function() {
  "use strict";

  var snooze = require('snooze');
  var PDFDocument = require('pdfkit');
  var fs = require('fs');

  function format() {

    return new Promise(function(resolve, reject) {
      var doc = new PDFDocument();

      var file = __dirname + "/output.pdf";
      console.log('file1:', file);
      var stream = fs.createWriteStream(file);

      var resultStream = doc.pipe(stream);

      doc
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100)

      doc.end();

      console.log('file2:', file);

      resultStream.on('finish', function() {
        resolve(file);
      })

    })

  }

  function getModel() {
    return this._model;
  }

  snooze
    .module("formatter-pdfkit")
    .service("PdfKitFormatter", function PdfKitFormatterFactory() {

      function PdfKitFormatter(model) {
        this._model = model;
      }

      PdfKitFormatter.prototype.format = format;
      PdfKitFormatter.prototype.getModel = getModel;

      return PdfKitFormatter;

    })

}());
