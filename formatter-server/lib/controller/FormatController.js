(function() {
	"use strict";

	var snooze = require('snooze');

	function FormatController() {

	}

	function format(req, res, next) {

	}

	function factory() {

		FormatController.prototype.format = format;

		return FormatController;
	}

	snooze
		.module("formatter-server")
		.service("FormatController", factory)

}());
