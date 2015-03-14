(function() {
	"use strict";

	var snooze = require('snooze');

	function FormatRouter() {

		var router = require('express').Router();

		var service = new FormatRouter.Formatter();

		console.log("Servie: ", service);

		var controller = new FormatRouter.FormatController(service);

		router.use('/format', controller.format.bind(controller));

		return router;

	}

	function factory(FormatController, Formatter) {
		FormatRouter.FormatController = FormatController;
		FormatRouter.Formatter = Formatter;
		return FormatRouter;
	}

	snooze
		.module("http")
		.registerEntitiesFromPath("lib/controller/*")
		.service("FormatRouter", factory)



}());
