'use strict';
/*jshint asi: true */

var test = require('tape')

var objects = require('stream-spectrum/readable/object') 
  , numbers = require('stream-spectrum/readable/number') 
  , inspect = require('../')

function i(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('when piping objects', function (t) {
  
  var data = []
  var logged = []

  function log(d) {
    logged.push(d);
  }

  objects({ to: 1 })
    .pipe(inspect(log))
    .on('data', [].push.bind(data))
    .on('end', function () {
      t.deepEqual(
          logged
        ,  [ {  foo: 'bar',
                beep: { boop: 'beep-boop' },
                count: 0 },
              { foo: 'bar',
                beep: { boop: 'beep-boop' },
                count: 1 } ]
        , 'logs all thru coming objects'
      )

      t.deepEqual(
          data
        ,  [ {  foo: 'bar',
                beep: { boop: 'beep-boop' },
                count: 0 },
              { foo: 'bar',
                beep: { boop: 'beep-boop' },
                count: 1 } ]
        , 'pushes all thru coming objects downstream'
      )
      t.end()
    });
})

test('when piping buffers', function (t) {
  
  var data = []
  var logged = []

  function log(d) {
    logged.push(d.toString());
  }

  numbers({ to: 1 })
    .pipe(inspect(log))
    .on('data', [].push.bind(data))
    .on('end', function () {
      t.deepEqual(
          logged
        , [ '0', '1' ] 
        , 'logs all thru coming buffers'
      )

      t.deepEqual(
          data.map(function (d) { return d.toString() })
        , [ '0', '1' ] 
        , 'pushes all thru coming buffers downstream'
      )
      t.end()
    });
})

