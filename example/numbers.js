'use strict';

var numbers = require('stream-spectrum/readable/number')
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('../')

numbers({ to: 20 })
  .pipe(inspect())
  .pipe(tarpit());
