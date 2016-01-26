require('./helper');

describe('explorer', function() {
  describe('#findCssFiles', function() {
    it('should get cssFiles from directory', function() {
      var dir = 'test/examples/simple/'
      var cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.endsWith(dir + 'app.css'));
    });

    it('should get a cssFile from file', function() {
      var dir = 'test/examples/simple/app.css'
      var cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.endsWith(dir));
    });
  });
});
