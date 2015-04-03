(function() {
	"use strict";

	var snooze = require('snooze');
	var us = require('underscore');

	var injects = {};

	/**
	 *
	 */
	function getTextRenderer() {

		return function textRenderer(doc) {

			var model = this.getModel()

			us.mapObject(model.options, function(val, key) {
				var method = doc[key];
				if (method) {
					var split = [];
					if (val) {
						split = val.split(",");
					}
					doc = method.apply(doc, split);
				}
			})

			doc.text(model.value);

		};

	}

	/**
	 *
	 */
	function getRenderer(type) {
		if (type.toLowerCase() === "text") {
			return getTextRenderer();
		}
		return null;
	}

	/**
	 *
	 */
	function decorate() {
		var component = this.getComponent();
		var renderer = getRenderer(component.getType());
		component.render = renderer.bind(component);
		return component;
	}

	/**
	 *
	 */
	function getComponent() {
		return this._component;
	}


	snooze
		.module("formatter-pdfkit")
		.service("RendererDecorator", function factory() {

			function RendererDecorator(component) {
				this._component = component;
			}

			RendererDecorator.prototype.decorate = decorate;
			RendererDecorator.prototype.getComponent = getComponent;

			return RendererDecorator;

		})

}());
