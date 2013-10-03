# inspect-stream [![build status](https://secure.travis-ci.org/thlorenz/inspect-stream.png)](http://travis-ci.org/thlorenz/inspect-stream)

Inspects a nodejs stream 2+ and logs the data that's coming through.

```js
var numbers = require('stream-spectrum/readable/number')
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('inspect-stream')

numbers({ to: 5 })
  .pipe(inspect())
  .pipe(tarpit());
```

```
```

## Installation

    npm install inspect-stream

## API


## License

MIT
