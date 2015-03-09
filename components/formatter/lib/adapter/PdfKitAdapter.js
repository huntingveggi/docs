(function() {
	"use strict";

	var snooze = require('snooze');

	function format(model) {
		return new Promise(function(resolve, reject) {
			resolve(true);
		});
	}

	function factory() {

		function PdfKitAdapter(model) {
			this._model = model;
		}

		PdfKitAdapter.prototype.format = format;

		return PdfKitAdapter;

	}



	snooze
		.module("formatter")
		.service("PdfKitAdapter", factory)

	module.exports = factory;

}());
