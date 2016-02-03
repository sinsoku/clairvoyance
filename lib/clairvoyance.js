/* eslint no-loop-func: 1 */

var phantom = require('phantom');
var explorer = require('./explorer');

exports = module.exports = Clairvoyance;

function Clairvoyance(options) {
  this.css = options.css;
  this.html = options.html;
  this.reporters = options.reporters || [];
  this.result = {};
}

Clairvoyance.prototype.run = function(cb) {
  if (cb) {
    this.reporters.push(cb);
  }

  var _this = this;
  Promise
    .all([_createPhantom(this), _findCssFiles(this), _findHtmlFiles(this)])
    .then(function() {
      var tasks = [];

      for (var html of _this.htmlFiles) {
        for (var css of _this.cssFiles) {
          tasks.push(html.findCss(_this.ph, css));
        }
      }

      Promise.all(tasks).then(function() {
        _this.ph.exit();

        for (var css of _this.cssFiles) {
          _this.result[css.path] = css.result;
        }

        for (var reporter of _this.reporters) {
          reporter(_this.result);
        }
      });
    });
};

function _createPhantom(_this) {
  return new Promise(function(resolve) {
    phantom.create(function(ph) {
      _this.ph = ph;
      resolve();
    }, {dnodeOpts: {weak: false}});
  });
}

function _findCssFiles(_this) {
  return new Promise(function(resolve) {
    _this.cssFiles = explorer.findCssFiles(_this.css);
    resolve();
  });
}

function _findHtmlFiles(_this) {
  return new Promise(function(resolve) {
    _this.htmlFiles = explorer.findHtmlFiles(_this.html);
    resolve();
  });
}
