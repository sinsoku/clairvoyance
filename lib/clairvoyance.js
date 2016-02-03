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

  var cssFiles = explorer.findCssFiles(this.css);
  var htmlFiles = explorer.findHtmlFiles(this.html);

  var _this = this;
  var tasks = [];
  phantom.create(function(ph) {
    for (var html of htmlFiles) {
      for (var css of cssFiles) {
        tasks.push(html.findCss(ph, css));
      }
    }

    Promise.all(tasks).then(function() {
      ph.exit();

      for (var css of cssFiles) {
        _this.result[css.path] = css.result;
      }

      for (var reporter of _this.reporters) {
        reporter(_this.result);
      }
    });
  }, {dnodeOpts: {weak: false}});
};
