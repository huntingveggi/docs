(function() {
	"use strict";

	var snooze = require('snooze');

	snooze
		.module("formatter-pdfkit", ['snooze-baselib'])
		.registerEntitiesFromPath(__dirname + '/lib/**/*.js')
		.service("main", function() {
			return {};
		})


}());
