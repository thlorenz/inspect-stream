'use strict';

var objects = require('stream-spectrum/readable/object') 
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('../')

objects({ to: 5 })
  .pipe(inspect())
  .pipe(tarpit({ objectMode: true }));
