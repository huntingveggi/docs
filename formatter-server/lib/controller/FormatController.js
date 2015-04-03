(function() {
	"use strict";

	var snooze = require('snooze');

	var testModel = [{
		type: "text",
		value: "Hello World",
		options: {
			x: 100,
			y: 100
		}
	}]

	function format(req, res, next) {
		// var service = this.getService();
		var service = new FormatterController.Formatter(testData);
		service.format()
			.then(function(stream) {
				stream.pipe(res);
			})
	}

	function getService() {
		return this._service;
	}

	snooze
		.module("formatter-server")
		.service("FormatterController", function factory(Formatter) {

			FormatterController.Formatter = Formatter;

			function FormatterController(service) {
				// this._service = service || new Formatter();
			}

			FormatterController.prototype.format = format;
			FormatterController.prototype.getService = getService;

			return FormatterController;

		})

}());
