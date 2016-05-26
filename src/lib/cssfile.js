import fs from 'fs';
import path from 'path';
import css from 'css';

/**
 * Initialize a new CSS file with the given `dir`.
 * @constructor
 * @param {String} dir - a file path
 */
export default class CssFile {
  constructor(dir) {
    this.path = path.resolve(dir);
  }

  mark(val, start, end) {
    for (let i = start - 1; i < end; i++) {
      this.result[i] += val;
    }
  }

  fetch() {
    return new Promise(resolve => {
      fs.readFile(this.path, (_, data) => {
        this._initByContent(data.toString());
        resolve();
      });
    });
  }

  _initByContent(content) {
    const size = content.match(/\n/g).length;
    this.css = css.parse(content);
    this.rules = this.css.stylesheet.rules;
    this.result = new Array(size);
    for (let i = 0; i < size; i++) {
      this.result[i] = null;
    }
  }
}
