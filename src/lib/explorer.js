import fs from 'fs';
import path from 'path';
import CssFile from './cssfile';
import HtmlFile from './htmlfile';

/**
 * Search file paths.
 * @private
 * @param {String} dir - a file path
 * @param {Array} result - found files after run
 */
function walk(dir, result) {
  const stat = fs.statSync(dir);

  if (stat.isFile()) {
    result.push(dir);
  } else if (stat.isDirectory()) {
    fs.readdirSync(dir).forEach(item => walk(path.join(dir, item), result));
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
  const result = [];
  walk(dir, result);

  if (options.ext) {
    return result.filter(f => path.extname(f) === `.${options.ext}`);
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
  const files = find(dir, { ext: 'css' });
  return files.map(f => new CssFile(f));
}

/**
 * Return html files.
 * @public
 * @param {String} dir - a file path
 * @return {Array} -
 */
function findHtmlFiles(dir) {
  const files = find(dir, { ext: 'html' });
  return files.map(f => new HtmlFile(f));
}

exports.findCssFiles = findCssFiles;
exports.findHtmlFiles = findHtmlFiles;
