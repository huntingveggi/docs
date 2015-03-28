(function() {
  "use strict";

  var snooze = require('snooze');

  snooze
    .module("formatter-pdfkit", ['snooze-baselib'])
    .registerEntitiesFromPath('lib/services/*.js')

}());
