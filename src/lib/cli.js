import program from 'commander';
import pkg from '../package.json';  // eslint-disable-line import/no-unresolved
import Clairvoyance from './clairvoyance';
import jsonReporter from './reporters/json';


export default class CLI {
  run() {
    if (process.argv.length < 3) {
      process.argv.push('--help');
    }

    function appendReporter(v, reporters) {
      reporters.push(require(v)); // eslint-disable-line global-require
      return reporters;
    }

    program
      .version(pkg.version)
      .option('--css <path>', 'specify css path')
      .option('--html <path>', 'specify html path')
      .option('-R, --reporter <name>', 'append the reporter', appendReporter, [jsonReporter])
      .parse(process.argv);

    const parser = new Clairvoyance({
      css: program.css,
      html: program.html,
      reporters: program.reporter,
    });
    parser.run();
  }
}
