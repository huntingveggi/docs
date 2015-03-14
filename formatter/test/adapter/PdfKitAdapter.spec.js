(function() {
  "use strict";

  var snooze = require('snooze');
  var expect = require('expect');
  var fse = require('fs-extra');

  var app = snooze.module("formatter", ["snooze-baselib"]);
  app.registerEntitiesFromPath("lib/adapter/PdfKitAdapter.js");
  app.registerEntitiesFromPath("lib/components/Text.js");

  var model = {
    type: "text",
    value: "Hallo Test",
    options: {

    }
  }
  app.constant("model", model);

  beforeEach(function() {
    snooze.clear();
    app.runs.length = 0;
    app.configs.length = 0;
  })

  describe("Test PdfKitAdapter", function() {

    it(" - format()", function(done) {

      app
        .run(function(PdfKitAdapter, model) {

          var adapter = new PdfKitAdapter(model);

          adapter.format()
            .then(function(stream) {
              done();
            })

        })
        .wakeup();

    })

  })

}());
