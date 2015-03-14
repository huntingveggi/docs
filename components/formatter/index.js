(function() {
  "use strict";

  var snooze = require('snooze');

  function Formatter() {

  }

  function format(model) {
    return {
      "message": "This is formatter service"
    }
  }

  function factory() {
    Formatter.prototype.format = format;
    return Formatter;
  }

  snooze
    .module("formatter", ["snooze-baselib"])
    .service("Formatter", factory)

  module.exports = factory;

}());
