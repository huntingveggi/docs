(function() {
	"use strict";

	var snooze = require('snooze');

	snooze
		.module("formatter-server")
		.registerEntitiesFromPath("lib/controller/*")
		.service("FormatterRouter", function factory(FormatterController) {

			function FormatterRouter() {

				var router = require('express').Router();

				var controller = new FormatterController();

				router.get('/format', controller.format.bind(controller));

				return router;

			}

			return FormatterRouter;


		})



}());
