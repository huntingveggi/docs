(function() {
  "use strict";

  var snooze = require('snooze');

  function format() {
    var model = this.getModel();
    return Promise.resolve({
      mess: "asdasdas"
    });
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
