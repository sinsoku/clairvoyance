var assert = require('power-assert');
var fs = require('fs');
var spawn = require('child_process').spawn;

describe('JSON report', function() {
  it('write a json file to coverage/css-coverage.json', function(done) {
    this.timeout(10000);

    fs.unlink('coverage/css-coverage.json', function() {
      var bin = spawn('bin/clairvoyance', ['--css', 'test/examples/simple/app.css', '--html', 'test/examples/simple/index.html']);
      bin.stdout.on('data', function(data) {
        var expected = 'Coverage report generated to coverage/css-coverage.json\n';
        assert.equal(data.toString(), expected);
      });
      bin.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
      });
      bin.on('close', function(code) {
        assert.equal(code, 0);
        fs.stat('coverage/css-coverage.json', function(err) {
          assert.equal(err, null);
          var content = fs.readFileSync('coverage/css-coverage.json').toString();
          var json = JSON.parse(content);
          var fileName = Object.keys(json)[0];
          assert(fileName.match('test/examples/simple/app.css'));
          done();
        });
      });
    });
  });
});
