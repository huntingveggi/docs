#!/usr/bin/env node
'use strict';
var meow = require('meow');
var http = require('./');

var cli = meow({
  help: [
    'Usage',
    '  http <input>',
    '',
    'Example',
    '  http Unicorn'
  ].join('\n')
});

http(cli.input[0]);
