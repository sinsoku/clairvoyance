var fs = require('fs'),
    path = require('path'),
    CssFile = require('./cssfile'),
    HtmlFile = require('./htmlfile');

function walk(dir, result) {
  fs.readdirSync(dir).forEach(function(item) {
    var fullpath = path.join(dir, item);
    var stat = fs.statSync(fullpath);

    if (stat.isFile()) {
      result.push(fullpath);
    } else if (stat.isDirectory()) {
      walk(fullpath, result);
    }
  });
}

function find(dir, options) {
  var result = [];
  walk(dir, result);

  if (options.ext) {
    return result.filter(function(f) {
      return path.extname(f) == "." + options.ext;
    });
  } else {
    return result;
  }
}

function findCssFiles(dir) {
  var files = this.find(dir, {ext: "css"});
  return files.map(function(f) { return new CssFile(f) });
}

function findHtmlFiles(dir) {
  var files = this.find(dir, {ext: "html"});
  return files.map(function(f) { return new HtmlFile(f) });
}

exports.find = find;
exports.findCssFiles = findCssFiles;
exports.findHtmlFiles = findHtmlFiles;