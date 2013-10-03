'use strict';

var stream = require('stream');

var util  =  require('util')
  , slice =  Array.prototype.slice;

function isBuffer (chunk) {
  // it seems like chunks emitted from a readable are considered not to be buffers by the browserify-buffer module
  // mainly because instanceof chunk !== Buffer although chunk is actually a Buffer
  // however these Buffers have an .offset and .get, and numerous .read methods, so if we find these we'll assume it's a buffer
  return Buffer.isBuffer(chunk)
    || ( typeof chunk.offset === 'number'
      && typeof chunk.get === 'function'
      && typeof chunk.readDoubleBE === 'function'
      && typeof chunk.readInt32BE === 'function')
}

function blowup () {
  throw new Error('Argument to inspect-stream needs to be either Number for depth or a log Function');
}

function defaultLog (depth) {
  function log (data) {
    var val = isBuffer(data) ? data.toString() : data;
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

var Transform = stream.Transform;

/**
 * Creates a transform stream that will log the data coming through and push it downstream.
 * 
 * @name exports
 * @function
 * @param depthOrLog {Number|Function} allows to override the log inspect depth or replace the log function entirely.
 * @return {TransformStream} that behaves like the upstream.
 */
module.exports = function (depthOrLog) { 
  var inspect = new InspectTransform(depthOrLog);
  inspect.on('pipe', function (readable) {
    this._readableState.objectMode = readable._readableState.objectMode;
    this._writableState.objectMode = readable._readableState.objectMode;
  })

  return inspect;
}

util.inherits(InspectTransform, Transform);

function InspectTransform (depthOrLog) {
  if (!(this instanceof InspectTransform)) return new InspectTransform(depthOrLog);

  Transform.call(this);

       if (typeof depthOrLog === 'undefined') this._log = defaultLog(1);
  else if (typeof depthOrLog === 'number')    this._log = defaultLog(depthOrLog);
  else if (typeof depthOrLog === 'function')  this._log = depthOrLog;
  else blowup();
}

InspectTransform.prototype._transform = function (chunk, encoding, cb) {
  this._log(chunk);
  this.push(chunk);
  cb()
}
