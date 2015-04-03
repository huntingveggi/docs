(function() {
	"use strict";

	var snooze = require('snooze');
	var util = require('util');

	snooze
		.module("formatter-components")
		.registerEntitiesFromPath('lib/Component.js')
		.service('ComponentFactory', function(Component) {

			function ComponentFactory() {
				this._components = {};
			}

			ComponentFactory.prototype.create = function(name) {
				name = name.toLowerCase();
				return this._components[name];
			}

			ComponentFactory.prototype.register = function(name, component) {

				name = name.toLowerCase();

				function RegisteredComponent(model) {
					Component.call(this, model);
				}

				util.inherits(RegisteredComponent, Component);

				RegisteredComponent.prototype.getType = function() {
					return component.type;
				}

				RegisteredComponent.prototype.render = component.render;

				this._components[name] = RegisteredComponent;
			}

			return new ComponentFactory();

		})
		.registerEntitiesFromPath('lib/components.js')

}());
