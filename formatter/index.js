(function() {
	"use strict";

	var snooze = require('snooze');

	function Formatter() {

	}

	function format(model) {
		return {
			"message": "This is formatter service"
		}
	}

	function factory() {
		Formatter.prototype.format = format;
		return Formatter;
	}

	snooze
		.module("formatter", ["snooze-baselib", "config"])
		.service("formatter", function(config) {
			var use = config.get("formatter.use");
			return new Formatter();
		})

	module.exports = factory;

}());
