import phantom from 'phantom';
import explorer from './explorer';

/**
 * @private
 * @param {Clairvoyance} _this -
 * @return {Promise} -
 */
function _createPhantom(_this) {
  return new Promise(resolve => {
    phantom.create().then(ph => {
      _this.ph = ph;
      resolve();
    });
  });
}

/**
 * @private
 * @param {Clairvoyance} _this -
 * @return {Promise} -
 */
function _findCssFiles(_this) {
  return new Promise(resolve => {
    _this.cssFiles = explorer.findCssFiles(_this.css);
    Promise.all(_this.cssFiles.map(css => css.fetch()))
      .then(resolve);
  });
}

/**
 * @private
 * @param {Clairvoyance} _this -
 * @return {Promise} -
 */
function _findHtmlFiles(_this) {
  return new Promise(resolve => {
    _this.htmlFiles = explorer.findHtmlFiles(_this.html);
    resolve();
  });
}

/**
 * Set up clairvoyance with `options`.
 * @param {Object} options -
 */
class Clairvoyance {
  constructor(options) {
    this.css = options.css;
    this.html = options.html;
    this.reporters = options.reporters || [];
    this.result = {};
  }

  run(cb) {
    if (cb) {
      this.reporters.push(cb);
    }

    Promise
      .all([_createPhantom(this), _findCssFiles(this), _findHtmlFiles(this)])
      .then(() => {
        const tasks = [];

        for (const html of this.htmlFiles) {
          for (const css of this.cssFiles) {
            tasks.push(html.findCss(this.ph, css));
          }
        }

        Promise.all(tasks).then(() => {
          this.ph.exit();

          for (const css of this.cssFiles) {
            this.result[css.path] = css.result;
          }

          for (const reporter of this.reporters) {
            reporter(this.result);
          }
        });
      });
  }
}

exports = module.exports = Clairvoyance;
