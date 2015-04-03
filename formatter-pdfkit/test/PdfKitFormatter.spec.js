(function() {
  "use strict";

  var snooze = require('snooze');
  var expect = require('expect');
  var Stream = require('stream');
  var us = require('underscore');
  var fse = require('fs-extra');

  var app = snooze.module("formatter-pdfkit", ["snooze-baselib"]);
  app.registerEntitiesFromPath("lib/**/*.js");

  app.service('Component', function() {

    function Component(model) {
      this._model = model;
    }

    Component.prototype.render = function(doc) {
      throw new Error("Test not implemented");
    };

    Component.prototype.getType = function() {
      return this._model.type;
    };

    Component.prototype.getModel = function() {
      return this._model;
    };

    return Component;

  })

  app.service('testModel1', function() {

    var testModel = {
      type: "text",
      value: "Hello World",
      options: {
        fillColor: "green",
        moveDown: "5"
      }
    };

    return testModel;
  })

  app.service('testModel2', function() {

    var testModel = {
      type: "text",
      value: "Hello World 2",
      options: {
        fillColor: "blue",
        moveDown: "10",
      }
    };

    return testModel;
  })



  beforeEach(function() {
    snooze.clear();
    app.runs.length = 0;
    app.configs.length = 0;
  })

  var target = null;

  describe("Test formatter", function() {

    it(" - format()", function(done) {

      app
        .run(function(PdfKitFormatter, testModel1, testModel2,
          Component,
          TargetResolver) {

          var target = new TargetResolver("output.pdf").resolve();

          var comp1 = new Component(testModel1);
          var comp2 = new Component(testModel2);

          var model = [comp1, comp2];
          var formatter = new PdfKitFormatter(model);

          formatter.format()
            .then(function(stream) {
              expect(stream).toExist();
              expect(stream).toBeA(Stream);
            })
            .then(function() {
              fse.removeSync(target);
              done();
            })

        })
        .wakeup();

    })

  })

}());
