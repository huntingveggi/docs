(function() {
  "use strict";

  var util = require('util');
  var Element = require(__dirname + '/Element.js');
  var Promise = require('bluebird');

  function MoveDown(elem) {

    Element.call(this, elem);

  }

  util.inherits(MoveDown, Element);

  MoveDown.prototype.exec = function(doc) {
    doc.moveDown();
    return Promise.resolve(doc);
  }

  module.exports = MoveDown;


}());
