(function() {
	"use strict";

	var snooze = require('snooze');


	function format(model) {
		return Promise.resolve()
			.then(function() {

				return {
					"message": "This is formatter service"
				}
			})
	}

	snooze
		.module("formatter")
		.service("Formatter", function factory() {

			function Formatter() {

			}

			Formatter.prototype.format = format;

			return Formatter;

			// return PdfKitFormatter;


		})

}());
