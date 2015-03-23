/*global describe, it */
'use strict';
var assert = require('assert');
var http = require('../');

describe('http node module', function () {
  it('must have at least one test', function () {
    http();
    assert(false, 'I was too lazy to write any tests. Shame on me.');
  });
});
