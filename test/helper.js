global.assert = require('power-assert');

global.Clairvoyance = require('../lib/clairvoyance');
global.explorer = require('../lib/explorer');
global.CssFile = require('../lib/cssfile');
global.HtmlFile = require('../lib/htmlfile');
global.jsonReporter = require('../lib/reporters/json');

global.eq = function(value) {
  return function(x) {
    return x === value;
  };
};
