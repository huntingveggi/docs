(function() {
  "use strict";

  var fs = require("fs");
  var Bacon = require("baconjs");
  var cheerio = require('cheerio');
  var Promise = require('bluebird');
  var util = require('util');

  var ElementFactory = require(__dirname + '/../factories.js').ElementFactory;


  function XmlTemplate(source) {

    var self = this;
    this._source = source

  }

  XmlTemplate.prototype.getComponents = function() {

    var source = this._source;

    return source.getData()
      .then(function(data) {
        var $ = cheerio.load(data, {
          normalizeWhitespace: false,
          xmlMode: false,
          decodeEntities: true
        });
        return $;
      })
      .then(function($) {
        var components = [];
        $("root").children().each(function(i, elem) {
          var Component = ElementFactory.getByElement(elem);
          if (Component) {
            var c = new Component(elem);
            components.push(c);
          }
        })
        return components;
      })


  };


  module.exports = XmlTemplate;



}());
