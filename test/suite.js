var Document = require(__dirname + "/../modules/core/Document");
var fs = require("fs");
var Bacon = require("baconjs");
var os = require("os");
var S = require("string");
var sugar = require("sugar");

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

var file = __dirname + "/text.txt";

var content = Bacon.fromNodeCallback(fs.readFile, file)
  .map(function(item) {
    return S("" + item).lines();
    // return "" + item
  })
  .flatMap(Bacon.fromArray)
  .filter(function(item) {
    return (item !== "");
  })
  .filter(function(item) {
    return !S(item).startsWith("//");
  })


var text = content
  .filter(function(item) {
    return (item !== "");
  })
  .filter(function(item) {
    return !S(item).startsWith("|");
  })
  .scan("", function(a, b) {
    return a + " " + b;
  })



var commands = content
  .filter(function(item) {
    return S(item).startsWith("|");
  })
  .map(function(item) {
    return S(item).chompLeft("|").s;
  })
  .map(function(item) {
    return item.split(/->/)
  })
  .flatMap(Bacon.fromArray)
  .filter(notNullFilter)
  .map(function(item) {
    return /(.*)\((.*)\)/gi.exec(item);
  })
  .filter(function(item) {
    return item.length > 1;
  })
  .flatMap(function(item) {
    var command = Bacon.constant(item[1]);
    var value;
    if (item[2] === "$text") {
      value = text;
    } else {
      value = Bacon.constant(item[2]);
    }
    return Bacon.combineTemplate({
      command: command,
      value: value
    })
  }).log();


function notNullFilter(item) {
  return item !== null;
}



var xyz;
