module.exports = HtmlFile;

/**
 * Initialize a new HTML file with the given `path`.
 * @constructor
 * @param {String} path - a file path
 */
function HtmlFile(path) {
  this.path = path;
}

HtmlFile.prototype.querySelectorAll = function(ph, style, cb) {
  var _this = this;
  return new Promise(function(resolve) {
    ph.createPage().then(function(page) {
      page.open(_this.path).then(function() {
        var func = 'function() { ' +
          'return document.querySelectorAll("' + style + '"); }';
        page.evaluateJavaScript(func).then(function(value) {
          cb(value);
          resolve();
        });
      });
    });
  });
};

HtmlFile.prototype.findCss = function(ph, css) {
  var _this = this;
  var tasks = [];

  css.rules.forEach(function(rule) {
    if (rule.type !== 'rule') {
      return;
    }

    var style = rule.selectors.toString();
    var task = _this.querySelectorAll(ph, style, function(value) {
      css.mark(value.length, rule.position.start.line, rule.position.end.line);
    });
    tasks.push(task);
  });

  return new Promise(function(resolve) {
    Promise.all(tasks).then(resolve);
  });
};