(function() {
	"use strict";

	var snooze = require('snooze');

	function format(model) {

	}

	snooze
		.module("formatter-pdfkit")
		.service("Formatter", function() {

			function Formatter() {

			}

			Formatter.prototype.format = format;

			return Formatter;

		})

}());
