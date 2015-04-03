(function() {
  "use strict";

  var snooze = require('snooze');
  var us = require('underscore');

  snooze
    .module("formatter")
    .service("Formatter", function factory(PdfKitFormatter) {

      function Formatter(model) {
        console.log("Formatter model before: ", model);
        model = us.map(model, function(m) {
          // return ComponentFactory.create(model.type);
          return m;
        })
        return new PdfKitFormatter(model);
      }


      return Formatter;

    })

}());
