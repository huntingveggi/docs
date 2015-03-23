(function() {
  "use strict";

  var snooze = require('snooze');

  function FormatterRouter() {

    var router = require('express').Router();

    return router;

  }

  function factory() {
    return FormatterRouter;
  }

  snooze
    .module("formatter-server")
    .registerEntitiesFromPath("lib/controller/*")
    .service("FormatterRouter", factory)



}());
