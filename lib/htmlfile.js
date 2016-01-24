module.exports = HtmlFile;

function HtmlFile(path) {
  this.path = path;
}

HtmlFile.prototype.querySelectorAll = function(ph, style, cb) {
  var _this = this;
  return new Promise(function(resolve) {
    ph.createPage(function (page) {
      page.open(_this.path, function (status) {
        page.evaluate((function () {
          var func = function (s) {
            return document.querySelectorAll(s);
          };
          return "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify([style]) + ");}";
        }()), function(value) {
          cb(value);
          resolve();
        });
      });
    });
  });
};
