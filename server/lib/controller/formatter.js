(function() {
	"use strict";

	var snooze = require('snooze');

	function FormatController(service) {
		this._service = service
		console.log("FormatController.This.servive: ", service);
	}

	function format(req, res, next) {

		var service = this._service;
		console.log("FormatController.format.servive: ", service);

		var result = service.format(req.body);

		res.status(200).json(result);
	}

	snooze
		.module("http")
		.service("FormatController", function() {
			FormatController.prototype.format = format;
			return FormatController;
		})



}());
