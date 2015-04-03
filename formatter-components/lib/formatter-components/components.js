(function() {
  "use strict";

  var snooze = require('snooze');

  snooze
    .module("formatter-components")
    .service('defaultTextComponent', function() {
      return {
        type: 'text',
        render: function(doc) {
          var model = this.getModel();
          var x = null;
          var y = null;
          if (model.options) {
            x = model.options.x;
            y = model.options.y;
          }
          doc.text(model.value, model.options);
        }
      }
    })
    .service('DefaultComponents', function(ComponentFactory,
      defaultTextComponent) {

      ComponentFactory.register('text', defaultTextComponent);

      return ComponentFactory;

    })

}());
