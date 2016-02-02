var assert = require('power-assert');
var Clairvoyance = require('../lib/clairvoyance');

describe('Clairvoyance', function() {
  describe('#run', function() {
    it('call a function with result', function(done) {
      this.timeout(10000);

      var parser = new Clairvoyance({
        css: 'test/examples/simple/app.css',
        html: 'test/examples/simple/index.html'
      });
      parser.run(function(result) {
        var fileName = Object.keys(result)[0];
        assert(fileName.match('test/examples/simple/app.css'));
        done();
      });
    });
  });
});
