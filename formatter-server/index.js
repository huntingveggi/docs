(function() {
  "use strict";

  var express = require('express');
  var bodyParser = require('body-parser');
  var snooze = require('snooze');
  var config = require('config');


  var myApp = snooze.module("formatter-server");

  myApp
    .registerEntitiesFromPath("lib/router/*")
    .service("application", function(FormatterRouter) {

      var app = express();
      app.use(bodyParser.json());
      app.use("/api/", new FormatterRouter());

      return app;

    })
    .service("server", function(application, port) {

      var server;

      return {
        start: function() {
          server = application.listen(port);
          return Promise.resolve(server);
        },
        stop: function() {
          if (server) {
            return Promise
              .resolve()
              .then(function() {
                return server.close();
              })
          }
          return Promise.reject(null);
        }
      }

    })


}());
