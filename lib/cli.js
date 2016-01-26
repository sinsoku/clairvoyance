var Clairvoyance = require('./clairvoyance'),
    fs = require('fs');

module.exports = new CLI();

function CLI() {}

CLI.prototype.start = function(options) {
  this.parser = new Clairvoyance(options);
  this.parser.run(function(result) {
    fs.mkdir('coverage', function(err) {
      var data = JSON.stringify(result);
      fs.writeFile('coverage/css-coverage.json', data);
    });
  });
}
