(function() {
	"use strict";

	var snooze = require('snooze');

	function FormatController(req, res, next) {
		console.log("----asd-a-d-asd-");

	}

	snooze
		.module("app")
		.registerEntitiesFromPath("modules/core/services/FormatService.js")
		.service("FormatController", function(FormatService) {
			FormatController.FormatService = FormatService;
			return FormatController;
		})



}());
