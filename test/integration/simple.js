var assert = require('power-assert');
var fs = require('fs');
var spawn = require('child_process').spawn;

describe('JSON report', function() {
  it('write a json file to coverage/css-coverage.json', function() {
    this.timeout(10000);
    var args = [
      '--css', 'test/examples/simple/app.css',
      '--html', 'test/examples/simple/index.html'
    ];
    var filepath = 'coverage/css-coverage.json';

    return new Promise(function(resolve) {
      fs.unlink(filepath, resolve);
    }).then(function() {
      return new Promise(function(resolve) {
        var bin = spawn('bin/clairvoyance', args);
        bin.stdout.on('data', function(data) {
          var expected = 'Coverage report generated to ' + filepath + '\n';
          assert(data.toString() === expected);
        });
        bin.on('close', function(code) {
          assert(code === 0);
          resolve();
        });
      });
    }).then(function() {
      return new Promise(function(resolve) {
        fs.stat(filepath, function(err) {
          assert(err === null);
          var content = fs.readFileSync(filepath).toString();
          var json = JSON.parse(content);
          var fileName = Object.keys(json)[0];
          assert(fileName.match('test/examples/simple/app.css'));
          resolve();
        });
      });
    });
  });
});
