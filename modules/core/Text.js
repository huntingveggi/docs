	(function() {
	  "use strict";

	  var $ = require('cheerio');
	  var util = require('util');
	  var Element = require(__dirname + '/Element.js');
	  var S = require('string');
	  var Bacon = require('baconjs');
	  var sugar = require('sugar');
	  var Promise = require('bluebird');

	  function Text(elem, options) {

	    Element.call(this, elem);

	    var self = this;

	    this.options = options;
	    this.text = "";
	    this.fontFamily = $(elem).css("font-family");
	    this.fontSize = $(elem).css("font-size");
	    this.x = $(elem).css("x") || null;
	    this.y = $(elem).css("y") || null;

	    if (this.x) {
	      this.x = parseInt(this.x);
	    }
	    if (this.y) {
	      this.y = parseInt(this.y);
	    }

	    var text = S($(elem).text()).trim().s;
	    var lines = S(text).lines();
	    lines.forEach(function(line) {
	      line = S(line).trim().s;
	      if (line && line !== "") {
	        self.text += " " + line;
	      }
	    })


	  }

	  util.inherits(Text, Element);

	  Text.prototype.exec = function(doc) {

	    return new Promise(function(resolve, reject) {

	      var model = this.getModel();
	      var text = this.text;
	      var self = this;

	      var result = Bacon
	        .constant(text)
	        .map(function(item) {
	          return item.each(/\$?{\S+}/);
	        })
	        .flatMap(Bacon.fromArray)
	        .map(function(item) {
	          var str = S(item).chompLeft("$").s
	          str = S(str).chompLeft("{").s
	          str = S(str).chompRight("}").s;
	          return str;
	        })
	        .flatMap(function(item) {
	          var result = Bacon.combineTemplate({
	            key: "${" + item + "}",
	            value: Bacon.constant(model).map("." + item),
	          })
	          return result;
	        })
	        .map(function(item) {
	          return S(text).replaceAll(item.key, item.value).s;
	        })
	        .toProperty();

	      result.onValue(function(item) {
	        self.text = item;
	      })

	      result.onEnd(function() {
	        doc.text(self.text, self.x, self.y);
	        resolve(doc);
	      })

	    }.bind(this))
	  }

	  module.exports = Text;


	}());
