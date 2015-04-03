(function() {
  "use strict";

  var config = require('config');
  var S = require('string');
  var snooze = require('snooze');
  var PDFDocument = require('pdfkit');
  var fs = require('fs');

  var injects = {};

  function format() {

    var model = this.getModel();

    return new Promise(function(resolve, reject) {

      var doc = new PDFDocument();
      var target = config.get("target").replace("__dirname", __dirname);
      var file = new injects.TargetResolver("output.pdf").resolve();
      var stream = fs.createWriteStream(file);
      var resultStream = doc.pipe(stream);

      model.forEach(function(m) {
        m.render(doc);
      })

      doc.end();

      resultStream.on('finish', function() {
        resolve(fs.createReadStream(file));
      })

    })

  }

  function getModel() {
    return this._model;
  }

  snooze
    .module("formatter-pdfkit")
    .service("TargetResolver", function() {

      function TargetResolver(name) {
        this._target = name;
      }

      TargetResolver.prototype.resolve = function() {
        var root = config.get("target").replace("__dirname", __dirname);
        root = S(root).chompRight("/").s;
        var target = S(this._target).chompLeft("/");
        return root + "/" + target;
      };

      return TargetResolver;
    })
    .service("PdfKitFormatter", function PdfKitFormatterFactory(
      TargetResolver) {

      injects.TargetResolver = TargetResolver;

      function PdfKitFormatter(model) {
        this._model = model;
      }


      PdfKitFormatter.prototype.format = format;
      PdfKitFormatter.prototype.getModel = getModel;

      return PdfKitFormatter;

    })

}());
