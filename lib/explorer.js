var fs = require('fs');
var path = require('path');
var CssFile = require('./cssfile');
var HtmlFile = require('./htmlfile');

/**
 * Search file paths.
 * @private
 * @param {String} dir - a file path
 * @param {Array} result - found files after run
 */
function walk(dir, result) {
  var stat = fs.statSync(dir);

  if (stat.isFile()) {
    result.push(dir);
  } else if (stat.isDirectory()) {
    fs.readdirSync(dir).forEach(function(item) {
      var fullpath = path.join(dir, item);
      walk(fullpath, result);
    });
  }
}

/**
 * Return files.
 * @private
 * @param {String} dir - a file path
 * @param {Object} options - specify a extention
 * @return {Array} -
 */
function find(dir, options) {
  var result = [];
  walk(dir, result);

  if (options.ext) {
    return result.filter(function(f) {
      return path.extname(f) === '.' + options.ext;
    });
  }

  return result;
}

/**
 * Return css files.
 * @public
 * @param {String} dir - a file path
 * @return {Array} -
 */
function findCssFiles(dir) {
  var files = find(dir, {ext: 'css'});
  return files.map(function(f) {
    return new CssFile(f);
  });
}

/**
 * Return html files.
 * @public
 * @param {String} dir - a file path
 * @return {Array} -
 */
function findHtmlFiles(dir) {
  var files = find(dir, {ext: 'html'});
  return files.map(function(f) {
    return new HtmlFile(f);
  });
}

exports.findCssFiles = findCssFiles;
exports.findHtmlFiles = findHtmlFiles;
