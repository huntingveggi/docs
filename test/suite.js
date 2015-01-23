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
  .flatMapConcat(Bacon.fromArray)
  .filter(function(item) {
    return (item !== "");
  })
  .filter(function(item) {
    return !S(item).startsWith("//");
  })


var doc = new Bacon.Bus();
var commands = new Bacon.Bus();
commands.plug(content);
// doc.plug(commands);

var textBus = new Bacon.Bus();

textBus.plug(content)

var buffer = "";

var text = textBus
  .filter(function(item) {
    return (item !== "");
  })
  .filter(function(item) {
    return !S(item).startsWith("|");
  })
  // .filter(function(item) {
  // 	return S(item).startsWith("|text") || !S(item).startsWith("|");
  // })
  .map(function(item) {
    if (buffer === "") {
      buffer = item;

    } else {
      buffer += " " + item;
    }
    return buffer;
  })
  // .log("Text: ")
text.onValue();


// text.onValue();

function resetText(argument) {
  // text.sampledBy(Bacon.constant("RESET"));
  textBus.push("RESET");
}


commands
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
      value = Bacon.constant("" + buffer);
    } else {
      value = Bacon.constant(item[2]);
    }
    buffer = "";
    return Bacon.combineTemplate({
      command: command,
      value: value
    })
  })
  .log("Command: ")
  // return {
  // 	func: item[1],
  // 	params: item[2]
  // }

doc
  .flatMap(function(item) {
    // return Bacon.constant(model).assign(model, item.func, item.params);
    return item
  })
  .log("Document: ")


function notNullFilter(item) {
  return item !== null;
}
