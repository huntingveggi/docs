(function() {
	"use strict";

	var snooze = require('snooze');
	var expect = require('expect');

	var app = snooze.module("formatter-pdfkit", ["snooze-baselib"]);
	app.registerEntitiesFromPath("lib/**/*.js");

	var model = [{
		type: 'text',
		value: 'This is a text',
		opts: {
			font: 12
		}
	}];

	beforeEach(function() {
		snooze.clear();
		app.runs.length = 0;
		app.configs.length = 0;
	})

	describe("Test ComponentFactory", function() {

		it(" - create(text)", function(done) {

			app
				.run(function(ComponentFactory, Text) {

					var type = ComponentFactory.get(model[0]);

					expect(type).toBe(Text);

				})
				.wakeup();

		})

	})

}());
