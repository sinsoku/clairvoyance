import { assert, CssFile } from './helper';
import fs from 'fs';

function eq(value) {
  return x => x === value;
}

describe('CssFile', () => {
  let css = null;

  beforeEach(() => {
    css = new CssFile('examples/simple/app.css');
    const data = fs.readFileSync(css.path);
    css._initByContent(data.toString());
  });

  describe('#constructor', () => {
    it('should format result fill with null', () => {
      assert.equal(css.result.length, 25);
      assert(css.result.every(eq(null)));
    });
  });

  describe('#mark', () => {
    it('should increase result', () => {
      css.mark(1, 0, 2);
      css.mark(1, 0, 1);

      assert.equal(css.result[0], 2);
      assert.equal(css.result[1], 1);
      assert(css.result.slice(2).every(eq(null)));
    });
  });
});
