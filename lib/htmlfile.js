module.exports = HtmlFile;

function HtmlFile(path) {
  this.path = path;
}

HtmlFile.prototype.querySelectorAll = function(ph, style, cb) {
  var _this = this;
  return new Promise(function(resolve) {
    ph.createPage(function(page) {
      page.open(_this.path, function() {
        var func = 'function() { return document.querySelectorAll("' + style + '"); }';
        page.evaluate(func, function(value) {
          cb(value);
          resolve();
        });
      });
    });
  });
};
