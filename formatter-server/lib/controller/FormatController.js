(function() {
	"use strict";

	var snooze = require('snooze');

	var testdata = {
		text: {
			value: "Hello World"
		}
	}

	function format(req, res, next) {
		var service = this.getService();
		service.format()
			.then(function(result) {
				// res.status(200).json(result);
				console.log('result: ', result);
				res.download(result);
			})
	}

	function getService() {
		return this._service;
	}

	snooze
		.module("formatter-server")
		.service("FormatterController", function factory(Formatter) {


			function FormatterController(service) {
				this._service = service || new Formatter();
			}

			FormatterController.prototype.format = format;
			FormatterController.prototype.getService = getService;

			return FormatterController;

		})

}());
