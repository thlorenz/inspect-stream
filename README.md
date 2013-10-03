# inspect-stream [![build status](https://secure.travis-ci.org/thlorenz/inspect-stream.png)](http://travis-ci.org/thlorenz/inspect-stream)

Inspects a nodejs stream 2+ and logs the data that's coming through.

```js
var objects = require('stream-spectrum/readable/object') 
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('inspect-stream')

objects({ from: 1, to: 3 })
  .pipe(inspect())
  .pipe(tarpit({ objectMode: true }));
```

```
{ foo: 'bar',
  beep: { boop: 'beep-boop' },
  count: 1 }
{ foo: 'bar',
  beep: { boop: 'beep-boop' },
  count: 2 }
{ foo: 'bar',
  beep: { boop: 'beep-boop' },
  count: 3 }
```

## Installation

    npm install inspect-stream

## API

###*function inspect(depthOrLog)

Creates a transform stream that will log the data coming through and push it downstream.

@name exports
@function
**params:**

- depthOrLog *Number|Function* allows to override the log inspect depth or replace the log function entirely.

**returns:**

*TransformStream* that behaves like the upstream.

## License

MIT
