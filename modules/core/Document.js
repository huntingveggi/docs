(function() {
  "use strict";

  var fs = require("fs");
  var Bacon = require("baconjs");
  var os = require("os");
  var S = require("string");
  var sugar = require("sugar");
  var cheerio = require('cheerio');
  var PDFDocument = require('pdfkit');
  var fs = require('fs');
  var Promise = require('bluebird');


  function Document(model) {

    this.setModel(model);

    this._components = [];

  }

  Document.prototype.setModel = function(model) {
    this._model = model;
  };

  Document.prototype.getModel = function() {
    return this._model;
  };

  Document.prototype.addComponent = function(c) {
    if (!c) {
      return this;
    }
    var self = this;
    if (Array.isArray(c)) {
      c.forEach(function(item) {
        self.getComponents().push(item);
      })
    } else {
      self.getComponents().push(c);
    }
  };

  Document.prototype.getComponents = function() {
    return this._components;
  };

  Document.prototype.render = function(target) {

    var self = this;

    return new Promise(function(resolve, reject) {

      var doc = new PDFDocument();
      doc.pipe(target);

      var components = self.getComponents();

      var result = Bacon
        .fromArray(components)
        .flatMapConcat(function(component) {
          component.setModel(self.getModel());
          return Bacon.fromPromise(component.exec(doc));
        })


      result.onEnd(function() {
        doc.end();
        resolve(self);
      });


    })

  };

  module.exports = Document;


}());
