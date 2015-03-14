(function() {
  "use strict";

  var snooze = require('snooze');
  var expect = require('expect');

  function Component(type, value) {

    expect(type).toExist();
    expect(value).toExist();

    this._type = type;
    this._value = value;
    this._components = [];

  }

  function getValue() {
    return this._value;
  }

  function getType() {
    return this._type;
  }

  function getComponents() {
    return this._components;
  }

  function addComponent(c) {
    this._components.push(c);
    return this;
  }

  function removeComponent(c) {
    throw new Error("Not yet implemented");
  }

  function factory() {

    Component.prototype.getComponents = getComponents;
    Component.prototype.addComponent = addComponent;
    Component.prototype.removeComponent = removeComponent;
    Component.prototype.getValue = getValue;
    Component.prototype.getType = getType;

    return Component;
  }


  snooze
    .module("formatter")
    .service("Component", factory);

}());
