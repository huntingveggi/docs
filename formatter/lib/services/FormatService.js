(function() {
	"use strict";

	var snooze = require('snooze');

	function FormatService(adapter) {
		this._adapter = adapter;
	}

	function format(model) {
		return this._adapter.format(model);
	}

	snooze
		.module("formatter")
		.service("FormatService", function() {
			FormatService.prototype.format = format;
			return FormatService;
		})

}());
