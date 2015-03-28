(function() {
	"use strict";

	var snooze = require('snooze');
	var config = require('config');

	var app = snooze.module('formatter-server', ['snooze-baselib', 'formatter']);

	app
		.constant("port", config.get("server.port"))
		.registerEntitiesFromPath('index.js')
		.run(function(server, port) {
			server.start()
				.then(function() {
					console.log("Server listen on port %s", port);
				})
		})
		.wakeup();

}());
