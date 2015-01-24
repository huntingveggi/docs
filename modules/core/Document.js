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


	function Document(args) {



	}

	Document.prototype.render = function(target) {

		var doc = new PDFDocument();
		doc.pipe(target);


		var ElementFactory = require(__dirname + '/../modules/factories.js').ElementFactory;

		var components = [];
		$("root").children().each(function(i, elem) {
			var Component = ElementFactory.getByElement(elem);
			if (Component) {
				var c = new Component(elem);
				c.setModel(model);
				components.push(c);
			}
		})

		var result = Bacon
			.fromArray(components)
			// .log()
			.flatMap(function(item) {
				return item.exec(doc);
			})


		result.onEnd(function() {
			doc.end();
		});

		return result;

	};



}());
