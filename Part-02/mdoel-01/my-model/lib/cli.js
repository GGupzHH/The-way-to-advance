#!/usr/bin/env node
'use strict';
const meow = require('meow');
const myModel = require('./');

const cli = meow(`
Usage
  $ my-model [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ my-model
  unicorns
  $ my-model rainbows
  unicorns & rainbows
`);
