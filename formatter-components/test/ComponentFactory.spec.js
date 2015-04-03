(function() {
	"use strict";

	var snooze = require('snooze');
	var expect = require('expect');

	var app = snooze.module("formatter-components", ["snooze-baselib"]);
	app.registerEntitiesFromPath("lib/formatter-components/*.js");

	beforeEach(function() {
		app.runs.length = 0;
		app.configs.length = 0;
	})

	describe("Test ComponentFactory", function() {

		it(" - register(name, component)", function(done) {

			app
				.run(function(ComponentFactory) {

					var Text = ComponentFactory.create('text');

					var text = new Text({
						value: "hello",
						options: {
							x: 50,
							y: 100
						}
					});

					text.render({
						text: function(value, options) {
							expect(value).toBe('hello');
							expect(options.x).toBe(50);
							expect(options.y).toBe(100);
						}
					});

					expect(text.getModel().value).toBe('hello');
					expect(text.getType()).toBe('text');

					done();

				})
				.wakeup();

		})

	})

}());
