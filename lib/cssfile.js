var fs = require('fs'),
    css = require('css');

module.exports = CssFile;

function CssFile(path) {
  this.path = path;

  var content = fs.readFileSync(path).toString();
  var size = content.match(/\n/g).length;
  this.css = css.parse(content);
  this.rules = this.css.stylesheet.rules
  this.result = new Array(size);
  for (i = 0; i < size; i++) {
    this.result[i] = null
  }
}

CssFile.prototype.mark = function(val, start, end) {
  for (i = start - 1; i < end; i++) {
    this.result[i] += val;
  }
};
