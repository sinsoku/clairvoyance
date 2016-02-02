require('./helper');

describe('CssFile', function() {
  beforeEach(function() {
    this.css = new CssFile('test/examples/simple/app.css');
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
