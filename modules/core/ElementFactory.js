(function() {
  "use strict";

  var Text = require(__dirname + '/Text.js');
  var MoveDown = require(__dirname + '/MoveDown.js');

  function ElementFactory(elements) {
    this._elements = elements;
  }

  ElementFactory.prototype.getByName = function(name) {
    if (name) {
      name = name.toLowerCase();
    }
    return this._elements[name];
  }

  ElementFactory.prototype.getByElement = function(elem) {
    return this.getByName(elem.tagName);
  }


  var elements = {};

  elements.text = Text;
  elements.movedown = MoveDown;

  module.exports = new ElementFactory(elements);

}());
