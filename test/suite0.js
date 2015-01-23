var Document = require(__dirname + "/../modules/core/Document");
var fs = require("fs");
var Bacon = require("baconjs");
var os = require("os");
var S = require("string");
var sugar = require("sugar");

var model = {
	name: "Dennis Ahaus",
	test: {
		name: "asdasdasAAASSS",
		name2: ["BLA", "BLUB"]
	},
	fontSize: function(data) {
		console.log("Modeldata: ", data);
	},
	text: function() {
		console.log("Calling text");
	}
}

var parser = new Bacon.Bus();
var commands = parser
	.map(function(item) {
		return item.split(".")
	})
	.flatMap(Bacon.fromArray)
	.filter(function(item) {
		return item !== "";
	})
	.map(function(item) {
		var params = /(.*)\((.*)\)/g.exec(item);
		return params;
	})
	.filter(function(item) {
		console.log(item);
		return item !== null && item.length > 1;
	})
	.map(function(item) {
		return {
			cmd: item[1],
			params: item[2]
		}
	})
	// .assign(function(item) {
	// 	return Bacon.constant(model).assign(item);
	// })
	.toProperty();

// commands.assign(model, "text")


commands.onValue(function(item) {

	// console.log("Parser: ", item);

	// console.log("params: ", params  );
});


var file = __dirname + "/text.txt";
var text = Bacon.fromNodeCallback(fs.readFile, file)
	.map(function(item) {
		return S("" + item).lines();
	})
	.flatMap(Bacon.fromArray)
	.filter(function(item) {
		if (S(item).startsWith("$=")) {
			parser.push(S(item).chompLeft("$="));
			return false;
		} else {
			return true;
		}
	})
	.reduce("", function(a, b) {
		return a + b + os.EOL;
	})
	.toProperty();

text
	.onValue(function(item) {
		// console.log("Text: ", item);
	})

var key = text.map(function(item) {
		return item.each(/\$?{\S+}/);
	})
	.map(function(item) {
		var str = S(item).chompLeft("$").s
		str = S(str).chompLeft("{").s
		str = S(str).chompRight("}").s;
		return str;
	})
	.map(function(item) {
		return "." + item;
	})

var value = key
	.flatMap(function(item) {
		return Bacon.constant(model).map(item);
	})
	.toProperty();

var template = Bacon.combineTemplate({
	key: key.map(function(item) {
		return item.from(1);
	}),
	value: value,
	commands: commands
})

template.onValue(function(item) {
	// console.log("template: ", item);

});

var result = Bacon.combineWith(function(template, text) {
	console.log("Tempate: ", template);
	// console.log("Text: ", text);
	var str = S(text).replaceAll("${" + template.key + "}", template.value).s;
	str = S(str).replaceAll("{" + template.key + "}", template.value).s;
	return str;
}, template, text);

result.onValue(function(item) {
	console.log(item);
})
