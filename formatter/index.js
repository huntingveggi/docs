(function() {
  "use strict";

  var snooze = require('snooze');

  snooze
    .module("formatter", ["snooze-baselib"])
    .registerEntitiesFromPath('lib/formatter/*.js')

}());
