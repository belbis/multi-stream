// standard imports
var stream = require("stream");

// local imports
var MS = require(__dirname + "/../").MultiStream;

var ms = new MS();

ms.add("foo");
ms.add("bar");

// show output
ms.pipe(process.stdout);