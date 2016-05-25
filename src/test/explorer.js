import { assert, explorer } from './helper';

describe('explorer', () => {
  describe('#findCssFiles', () => {
    it('should get cssFiles from directory', () => {
      const dir = 'examples/simple/';
      const cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.match(`${dir}app.css$`));
    });

    it('should get a cssFile from file', () => {
      const dir = 'examples/simple/app.css';
      const cssFiles = explorer.findCssFiles(dir);
      assert(cssFiles[0].path.match(dir));
    });
  });
});
