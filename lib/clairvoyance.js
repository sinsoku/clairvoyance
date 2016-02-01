var phantom = require('phantom'),
    explorer = require('./explorer');

exports = module.exports = Clairvoyance;

function Clairvoyance(options) {
  this.css = options.css;
  this.html = options.html;
  this.reporters = options.reporters || [];
  this.result = {};
}

Clairvoyance.prototype.run = function(cb) {
  var cssFiles = explorer.findCssFiles(this.css);
  var htmlFiles = explorer.findHtmlFiles(this.html);

  var _this = this;
  var tasks = [];
  phantom.create(function (ph) {
    for (var html of htmlFiles) {
      cssFiles.forEach(function(css) {
        css.rules.forEach(function(rule) {
          if (rule.type != "rule") { return; }

          var task = html.querySelectorAll(ph, rule.selectors.toString(), function(value) {
            css.mark(value.length, rule.position.start.line, rule.position.end.line);
          });
          tasks.push(task);
        });
      });
    }

    Promise.all(tasks).then(function() {
      for (var css of cssFiles) {
        _this.result[css.path] = css.result;
      }
      ph.exit();
      if (cb) {
        cb(_this.result);
      }
      for (var reporter of _this.reporters) {
        reporter(_this.result);
      }
    });
  }, { dnodeOpts: {weak: false} });
};
