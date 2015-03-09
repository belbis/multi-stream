// standard imports
var stream = require("stream");

// local imports
var MS = require(__dirname + "/../").MultiStream;

var ms = new MS();

// set up two readable streams
var foo = new stream.Readable();
foo._read = function(){this.push("foo");this.push(null);};

ms.add(foo);
ms.add("bar");

// show output
ms.pipe(process.stdout);