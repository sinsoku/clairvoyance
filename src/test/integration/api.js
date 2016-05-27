import { assert, Clairvoyance } from '../helper';

describe('API', () => {
  it('use an api as module', () => {
    const api = require('../../index'); // eslint-disable-line global-require, import/no-unresolved
    assert(api === Clairvoyance);
  });
});
