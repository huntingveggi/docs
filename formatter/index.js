(function() {
  "use strict";

  var snooze = require('snooze');

  snooze
    .module("formatter", ["snooze-baselib", "formatter-pdfkit"])
    .registerEntitiesFromPath('lib/formatter/*.js')

}());
