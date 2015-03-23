(function() {
	"use strict";

	var snooze = require('snooze');
	var expect = require('expect');
	var fse = require('fs-extra');

	var app = snooze.module("formatter", ["snooze-baselib"]);
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

	describe("Test formatter", function() {

		it(" - format()", function(done) {

			app
				.run(function(formatter) {



					formatter.format(model)
						.then(function(stream) {
							done();
						})

				})
				.wakeup();

		})

	})

}());
