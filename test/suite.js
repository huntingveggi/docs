var fs = require("fs");
var Bacon = require("baconjs");
var os = require("os");
var S = require("string");
var sugar = require("sugar");
var cheerio = require('cheerio');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var Promise = require('bluebird');

var model = {
	name: "Dennis Ahaus",
	name2: ["BLA", "BLUB"],
}

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('./test.pdf'));
// doc.text("jadshlashldashdl", 50, 50);


var file = __dirname + "/text.xml";
var data = fs.readFileSync(file);
var $ = cheerio.load(data, {
	normalizeWhitespace: false,
	xmlMode: false,
	decodeEntities: true
});

var ElementFactory = require(__dirname + '/../modules/factories.js').ElementFactory;

var commands = [];
$("root").children().each(function(i, elem) {
	var Component = ElementFactory.getByElement(elem);
	if (Component) {
		var c = new Component(elem);
		c.setModel(model);
		commands.push(c);
	}
})

var result = Bacon
	.fromArray(commands)
	// .log()
	.flatMap(function(item) {
		item.exec(doc);
	})


result.onEnd(function() {
	doc.end();
});
