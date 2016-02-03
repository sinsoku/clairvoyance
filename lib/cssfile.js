var fs = require('fs');
var path = require('path');
var css = require('css');

module.exports = CssFile;

/**
 * Initialize a new CSS file with the given `dir`.
 * @constructor
 * @param {String} dir - a file path
 */
function CssFile(dir) {
  this.path = path.resolve(dir);

  var content = fs.readFileSync(this.path).toString();
  var size = content.match(/\n/g).length;
  this.css = css.parse(content);
  this.rules = this.css.stylesheet.rules;
  this.result = new Array(size);
  for (var i = 0; i < size; i++) {
    this.result[i] = null;
  }
}

CssFile.prototype.mark = function(val, start, end) {
  for (var i = start - 1; i < end; i++) {
    this.result[i] += val;
  }
};
