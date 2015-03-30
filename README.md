a read stream that can add multiple streams/strings


[![NPM Version](https://nodei.co/npm/node-multistream.png?downloads=true)](https://npmjs.org/package/node-multistream)

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/belbis/multi-stream)


[![Build Status](https://secure.travis-ci.org/belbis/multi-stream.png?branch=master)](http://travis-ci.org/belbis/multi-stream) [![Coverage Status](https://coveralls.io/repos/belbis/multi-stream/badge.svg)](https://coveralls.io/r/belbis/multi-stream) [![Dependency Status](https://gemnasium.com/belbis/multi-stream.svg)](https://gemnasium.com/belbis/multi-stream)


## Installing

To install the latest release with npm run:

```npm install multi-stream```

to install the development version from github run:

```npm install "git+https://github.com/belbis/multi-stream"```

## Introduction

Multi-Stream is a stream library that allows for multiple streams to be read as one. 


## Usage

MultiStream works with any stream, but also with strings

```javascript
// standard imports
var stream = require("stream");

// npm imports
var MS = require("node-multistream");

var ms = new MS();

// set up simple readable streams
var foo = new stream.Readable();
foo._read = function(){this.push("foo");this.push(null);};

ms.add(foo);

// show output
ms.pipe(process.stdout);

```


## Future

chunked data reads

allow for silent fail
