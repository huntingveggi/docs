(function() {
	"use strict";

	var snooze = require('snooze');

	snooze
		.module("formatter", ["snooze-baselib", "formatter-pdfkit",
			"formatter-components"
		])
		.registerEntitiesFromPath('lib/formatter/*.js')

}());
