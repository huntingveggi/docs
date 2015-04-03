#!/usr/bin/env node
'use strict';
var meow = require('meow');
var formatterComponents = require('./');

var cli = meow({
  help: [
    'Usage',
    '  formatter-components <input>',
    '',
    'Example',
    '  formatter-components Unicorn'
  ].join('\n')
});

formatterComponents(cli.input[0]);
