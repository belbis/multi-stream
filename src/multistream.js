"use strict";

// standard imports
var util = require("util");
var stream = require("stream");

/**
 * MultiStream
 *
 * it's a readable stream that can add more streams to it
 *
 * @constructor
 */
function MultiStream() {
  stream.Readable.call(this);
  this._streams = [];
  this._idx = 0;
  this._cur = null;

  this.on("error", this._die);
}
util.inherits(MultiStream, stream.Readable);

/**
 * add
 *
 * add a stream to multistream
 */
MultiStream.prototype.add = function (s) {
  if (s instanceof stream.Readable) {
    this._streams.push(s);
  } else if (typeof s === "string") {
    this._streams.push(s);
  } else {
    throw new Error("must be instance of stream.Readable or String");
  }
  return this;
};

/**
 * _read
 *
 * stream.Readable implementation
 * @private
 */
MultiStream.prototype._read = function () {
  this._next();
};

/**
 * _next
 *
 * prepares next stream for reading by attaching
 * event listeners. errors or close kill the process
 * @private
 */
MultiStream.prototype._next = function () {
  this._cur = this._streams[this._idx++];  //
  if (this._cur instanceof stream.Readable) {
    this._cur.once("close", this._die.bind(this));
    this._cur.once("error", this._die.bind(this));
    this._cur.once("end", this._next.bind(this));
    this._cur.on("data", this.push.bind(this));
  } else if (typeof this._cur === "string") {
    this.push(this._cur);
  } else { // no more streams to process
    this.push(null);
  }
};

/**
 * _die
 *
 * kill me. throws error if error occurred
 * @private
 */
MultiStream.prototype._die = function (err) {
  if (!this._readableState.ended && err) {
    // we aren't done yet
    throw new Error("error occurred: " + err.message);
  }

  this._streams.length = 0; // remove any unread streams
};

// export module
module.exports = {
  MultiStream: MultiStream
};




