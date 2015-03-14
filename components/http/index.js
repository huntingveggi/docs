(function() {
	"use strict";

	var express = require('express');
	var bodyParser = require('body-parser');
	var snooze = require('snooze');


	var myApp = snooze.module("http", ["snooze-baselib", "formatter"]);

	myApp
		.registerEntitiesFromPath("lib/router/*")
		.run(function(FormatRouter) {

			var app = express();



			app.use(bodyParser.json())

			app.use("/api/", new FormatRouter());


			var port = 3000
			app.listen(port, function() {
				console.log("Server listening on port %s", port);
			})

		})
		.wakeup()



}());
