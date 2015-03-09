/**
 * multistream
 *
 * just a multi stream
 * @type {string}
 */
var src = process.env.MS_COV ? "/src-cov" : "/src";
module.exports = require(__dirname + src + "/multistream");