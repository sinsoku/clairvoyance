var assert = require('power-assert');
var explorer = require('../lib/explorer');

describe('explorer', function() {
  describe('#findCssFiles', function() {
    it('should get cssFiles from directory', function() {
      var dir = 'examples/simple/';
      var cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.match(dir + 'app.css$'));
    });

    it('should get a cssFile from file', function() {
      var dir = 'examples/simple/app.css';
      var cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.match(dir));
    });
  });
});
