(function() {
	"use strict";

	var snooze = require('snooze');

	snooze
		.module("formatter-components")
		.service('Component', function() {

			function Component(model) {
				this._model = model;
			}

			Component.prototype.getModel = function() {
				return this._model;
			}

			Component.prototype.getType = function() {
				return this.getModel().type;
			}

			Component.prototype.render = function() {
				throw new Error(
					"Component: Not yet implement. Please override this method!")
			};

			return Component;

		})

}());
