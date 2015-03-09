(function() {
	"use strict";

	var snooze = require('snooze');

	snooze
		.module("app")
		.registerEntitiesFromPath("server/controller/*")
		.service("FormatRouter", function(FormatController) {
			var router = require('express').Router();
			router.use(FormatController);
			return router;
		})



}());
