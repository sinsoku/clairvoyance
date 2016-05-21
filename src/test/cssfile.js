/* eslint require-jsdoc: 0 */

var assert = require('power-assert');
var fs = require('fs');
var CssFile = require('../lib/cssfile');

function eq(value) {
  return function(x) {
    return x === value;
  };
}

describe('CssFile', function() {
  beforeEach(function() {
    this.css = new CssFile('examples/simple/app.css');
    var data = fs.readFileSync(this.css.path);
    this.css._initByContent(data.toString());
  });

  describe('#constructor', function() {
    it('should format result fill with null', function() {
      var result = this.css.result;
      assert.equal(result.length, 25);
      assert(result.every(eq(null)));
    });
  });

  describe('#mark', function() {
    it('should increase result', function() {
      this.css.mark(1, 0, 2);
      this.css.mark(1, 0, 1);
      var result = this.css.result;
      assert.equal(result[0], 2);
      assert.equal(result[1], 1);
      assert(result.slice(2).every(eq(null)));
    });
  });
});
