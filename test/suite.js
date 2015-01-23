var Document = require(__dirname + "/../modules/core/Document");
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

  fontSize: function(data) {
    console.log("Calling fontSize", data);
  },
  text: function(data) {
    console.log("Calling text: ", data);
  }
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

var elems = {
  text: Text,
  movedown: MoveDown
}

var commands = [];
$("root").children().each(function(i, elem) {
  var obj = find(elem);
  commands.push(obj);
})

var result = Bacon
  .fromArray(commands)
  // .log()
  .flatMap(function(item) {
    item.exec(doc);
    return item;
  }).log();


result.onEnd(function() {
  doc.end();
});



function find(elem) {
  var obj = elems[elem.tagName.toLowerCase()];
  return new obj(elem);
}


function Text(elem) {

  var self = this;
  this.name = elem.tagName;
  this.fontFamily = $(elem).css("font-family");
  this.fontSize = $(elem).css("font-size");
  var text = S($(elem).text()).trim().s;
  var lines = S(text).lines();
  lines.forEach(function(line) {
    line = S(line).trim().s;
    if (line) {
      self.text += " " + line;
    }
  })

  this.exec = function(doc) {
    console.log("text: ", this.text);
    doc.text(this.text);
  }.bind(this)
}

function MoveDown(elem) {

  this.exec = function(doc) {
    doc.moveDown();
  }.bind(this)

}
