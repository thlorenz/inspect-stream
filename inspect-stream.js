'use strict';

var stream = require('stream');

var util  =  require('util')
  , slice =  Array.prototype.slice;

function defaultLog (depth) {
  function log (data) {
    console.log(util.inspect(data, false, depth, true));
  }

  return function (data) {
    if (arguments.length === 1) {
      log(data);
    } else {
      slice.call(arguments).forEach(log);
    }
  };
}

var Transform = stream.Transform;

module.exports = InspectTransform;

util.inherits(InspectTransform, Transform);

function InspectTransform (opts, depth) {
  if (!(this instanceof InspectTransform)) return new InspectTransform(opts);

  opts = opts || {};
  opts.objectMode = true;
  Transform.call(this, opts);
  this._log = defaultLog(depth || 1);
}

InspectTransform.prototype._transform = function (chunk, encoding, cb) {
  this._log(chunk);
  cb()
}

function defaultLog (depth) {
  function log (data) {
    var val = Buffer.isBuffer(data) ? data.toString() : data;
    console.log(util.inspect(val, false, depth, true));
  }

  return function (data) {
    if (arguments.length === 1) {
      log(data);
    } else {
      slice.call(arguments).forEach(log);
    }
  };
}
