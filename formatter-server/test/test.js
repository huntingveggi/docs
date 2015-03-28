(function() {
  "use strict";

  var expect = require('expect');
  var snooze = require('snooze');
  var config = require('config');

  var app = snooze.module('formatter-server', ['snooze-baselib', 'formatter']);

  beforeEach(function() {
    app.runs.length = 0;
    app.configs.length = 0;
  })

  var globalServer;


  after(function(done) {
    globalServer.stop();
    done();
  });

  describe("Test formatter-server", function() {

    it(" - server start", function(done) {

      app
        .constant("port", config.get("server.port"))
        .registerEntitiesFromPath('index.js')
        .run(function(server, port) {
          globalServer = server;
          server.start()
          done();
        })
        .wakeup();

    })

  })

}());
