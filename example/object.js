'use strict';

var objects = require('stream-spectrum/readable/object') 
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('../')

objects({ from: 1, to: 3 })
  .pipe(inspect())
  .pipe(tarpit({ objectMode: true }));
