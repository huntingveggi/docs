var fs = require("fs");
var Bacon = require("baconjs");
var os = require("os");
var S = require("string");
var sugar = require("sugar");
var cheerio = require('cheerio');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var Promise = require('bluebird');


var Document = require(__dirname + '/../modules/core/Document.js');
var Source = require(__dirname + '/../modules/core/FileSource.js');
var Template = require(__dirname + '/../modules/core/XmlTemplate.js');

var model = {
	name: "Dennis Ahaus",
	name2: ["BLA", "BLUB"],
}

var doc = new Document(model);
var s1 = new Source(__dirname + "/text.xml");
var t1 = new Template(s1);
var s2 = new Source(__dirname + "/text2.xml");
var t2 = new Template(s2);

var templates = [];
templates.push(t1);
templates.push(t2);

Bacon
	.fromArray(templates)
	.flatMap(function(item) {
		return Bacon.fromPromise(item.getComponents());
	})
	.map(function(item) {
		doc.addComponent(item);
		return doc;
	})
	// .log()
	.flatMap(function(item) {
		var stream = fs.createWriteStream(__dirname + '/test.pdf');
		return Bacon.fromPromise(doc.render(stream));
	})
	.log()
	//
	// template
	//   .getComponents()
	//   .then(function(result) {
	//     doc.addComponent(result);
	// 		return doc;
	//   })
	// 	.then();
