var Clairvoyance = require('./clairvoyance');

module.exports = new CLI();

function CLI() {}

CLI.prototype.start = function(options) {
  this.parser = new Clairvoyance(options);
  this.parser.run(function(result) {
    console.log(result);
  });
}
