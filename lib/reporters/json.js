var fs = require('fs');

module.exports = parse;

function parse(result) {
  fs.mkdir('coverage', function(err) {
    var data = JSON.stringify(result);
    fs.writeFile('coverage/css-coverage.json', data);

    console.log('Coverage report generated to ' + 'coverage/css-coverage.json');
  });
}
