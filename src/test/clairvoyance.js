import { assert, Clairvoyance } from './helper';

describe('Clairvoyance', () => {
  describe('#run', () => {
    it('call a function with result', done => {
      const parser = new Clairvoyance({
        css: 'examples/simple/app.css',
        html: 'examples/simple/index.html',
      });
      parser.run(result => {
        const fileName = Object.keys(result)[0];
        assert(fileName.match('examples/simple/app.css'));
        done();
      });
    });
  });
});
