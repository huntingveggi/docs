"use strict";
(function() {

  var Promise = require('bluebird');


  function Element(elem) {

    this._elem = elem;
    this._name = elem.tagName;

  }

  Element.prototype.exec = function(doc) {
    return Promise.resolve();
  }

  Element.prototype.setModel = function(model) {
    this._model = model;
    return this;
  }

  Element.prototype.getModel = function() {
    return this._model;
  }



  module.exports = Element


}());
