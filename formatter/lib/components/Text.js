(function() {
	"use strict";

	var snooze = require('snooze');
	var expect = require('expect');
	var util = require('util');


	function factory(Component) {

		util.inherits(Text, Component);

		function Text(value) {

			Component.call(this, Text, value);

		}

		return Text;
	}


	snooze
		.module("formatter")
		.registerEntitiesFromPath("lib/components/Component.js")
		.service("Text", factory);

}());
