/**
 * Initialize a new HTML file with the given `path`.
 * @constructor
 * @param {String} path - a file path
 */
class HtmlFile {
  constructor(path) {
    this.path = path;
  }

  querySelectorAll(ph, style, cb) {
    return new Promise(resolve => {
      ph.createPage().then(page => {
        page.open(this.path).then(() => {
          const func = `function() { return document.querySelectorAll("${style}"); }`;
          page.evaluateJavaScript(func).then(value => {
            cb(value);
            resolve();
          });
        });
      });
    });
  }

  findCss(ph, css) {
    const tasks = [];

    css.rules.forEach(rule => {
      if (rule.type !== 'rule') {
        return;
      }

      const style = rule.selectors.toString();
      const task = this.querySelectorAll(ph, style, value => {
        css.mark(value.length, rule.position.start.line, rule.position.end.line);
      });
      tasks.push(task);
    });

    return new Promise(resolve => Promise.all(tasks).then(resolve));
  }
}

module.exports = HtmlFile;
