(function() {
	"use strict";

	var snooze = require('snooze');
	var expect = require('expect');
	var Stream = require('stream');
	var us = require('underscore');
	var fse = require('fs-extra');

	var app = snooze.module("formatter-pdfkit", ["snooze-baselib"]);
	app.registerEntitiesFromPath("lib/**/*.js");

	app.service('Component', function() {

		function Component(model) {
			this._model = model;
		}

		Component.prototype.render = function(doc) {
			var model = this._model
			us.mapObject(model.options, function(val, key) {
				var method = doc[key];
				if (method) {
					var split = val.split(",");
					doc = method.apply(doc, split);
				}
			})
			doc.text(model.value);
		};

		return Component;

	})

	app.service('testModel', function() {

		var testModel = {
			type: "text",
			value: "Hello World",
			options: {
				fillColor: "red",
				moveDown: "1"
			}
		};

		return testModel;
	})

	app.service('testModel2', function() {

		var testModel = {
			type: "text",
			value: "Hello World 2",
			options: {
				fillColor: "blue",
				moveDown: "1"
			}
		};

		return testModel;
	})



	beforeEach(function() {
		snooze.clear();
		app.runs.length = 0;
		app.configs.length = 0;
	})

	var target = null;

	describe("Test formatter", function() {

		it(" - format()", function(done) {

			app
				.run(function(PdfKitFormatter, testModel, testModel2, Component,
					TargetResolver) {

					var target = new TargetResolver("output.pdf").resolve();

					var model = [new Component(testModel), new Component(testModel2)];
					var formatter = new PdfKitFormatter(model);

					formatter.format()
						.then(function(stream) {
							expect(stream).toExist();
							expect(stream).toBeA(Stream);
						})
						.then(function() {
							fse.removeSync(target);
							done();
						})

				})
				.wakeup();

		})

	})

}());
