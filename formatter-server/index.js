(function() {
  "use strict";

  var express = require('express');
  var bodyParser = require('body-parser');
  var snooze = require('snooze');
  var config = require('config');


  var myApp = snooze.module("formatter-server", ["snooze-baselib"]);

  myApp
    .service("port", function() {
      return config.get("server.port");
    })
    .registerEntitiesFromPath("lib/router/*")
    .run(function(FormatterRouter, port) {

      var app = express();


      app.use(bodyParser.json())

      app.use("/api/", new FormatterRouter());

      app.listen(port, function() {
        console.log("Server listening on port %s", port);
      })

    })
    .wakeup()



}());
