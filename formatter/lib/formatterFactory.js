(function() {
  "use strict";

  var snooze = require('snooze');

  snooze
    .module("formatter")
    .service("formatter", function(config) {
      var formatterUsage = config.get('formatter.use');
    })

}());
