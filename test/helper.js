global.assert = require('power-assert');

global.Clairvoyance = require('../lib/clairvoyance');
global.explorer = require('../lib/explorer');
global.cli = require('../lib/cli');
global.CssFile = require('../lib/cssfile');
global.HtmlFile = require('../lib/htmlfile');

global.eq = function(value) {
  return function(x) { return x === value; };
}
