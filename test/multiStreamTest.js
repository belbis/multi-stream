
// standard imports
var fs = require("fs");
var stream = require("stream");
var assert = require("assert");

// local imports
var MS = require(__dirname + "/../").MultiStream;

// test file read stream location
var TESTFILE = __dirname + "/data/foo.txt";

//
// tests
//

/**
 * addTest
 *
 * simulate adding elements to MultiStream
 * @param test
 */
var addTest = function(test) {
  var ms = new MS();
  var s = new stream.Readable();
  var s2 = "a";
  var s3 = null;

  test.ok(ms.add(s));
  test.ok(ms.add(s2));
  test.throws(function(){ms.add(s3)}, Error, "adding non stream/string should error");
  test.done();
};

/**
 * readTest
 *
 * simulate reading from MultiStream
 * @param test
 */
var readTest = function(test) {
  test.expect(1);
  var ms = new MS();
  var s = fs.createReadStream(TESTFILE);
  ms.add(s);

  // stream data
  var chunks = [];
  ms.on("data", function(d) {
    chunks.push(d);
  });

  ms.once("end", function() {
    test.equal(chunks.join(), "bar\nbaz\n");
    test.done();
  });

};

/**
 * multiTest
 *
 * simulate composing MultiStream of MultiStreams
 * also shows that streams can be modified before
 * streaming starts
 * @param test
 */
var multiTest = function(test) {
  test.expect(1);

  var ms = new MS();
  ms.add("hello");
  ms.add("dolly");

  // fail test on error
  ms.once("error", function() {
    test.fail();
    test.done();
  });

  // stream data
  var chunks= [];
  ms.on("data", function(d) {
    chunks.push(d);
  });

  ms.once("end", function(){
    test.equal(chunks.join(" "), "hello dolly");
    test.done()
  });
};

/**
 * errorTest
 *
 * simulates an error occurring
 * @param test
 */
var errorTest = function(test) {
  test.expect(1);
  var ms = new MS();
  ms.add("foo");
  test.throws(function() {
    ms.emit("error", new Error());
  }, Error);
  test.done();
};

// export module
module.exports = {
  addTest: addTest,
  readTest: readTest,
  multiTest: multiTest,
  errorTest: errorTest
};