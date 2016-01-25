require('./helper');

describe('explorer', function() {
  describe('#findCssFiles', function() {
    it('should get cssFiles from directory', function() {
      var path = 'test/examples/simple/'
      var cssFiles = explorer.findCssFiles(path);
      assert.equal(cssFiles[0].path, path + 'app.css');
    });

    it('should get a cssFile from file', function() {
      var path = 'test/examples/simple/app.css'
      var cssFiles = explorer.findCssFiles(path);
      assert.equal(cssFiles[0].path, path);
    });
  });
});
