import { assert } from '../helper';
import fs from 'fs';
import { spawn } from 'child_process';

describe('JSON report', () => {
  it('write a json file to coverage/css-coverage.json', () => {
    const args = [
      '--css', 'examples/simple/app.css',
      '--html', 'examples/simple/index.html',
    ];
    const filepath = 'coverage/css-coverage.json';

    return new Promise(resolve => {
      fs.unlink(filepath, resolve);
    })
    .then(() =>
      new Promise(resolve => {
        const bin = spawn('bin/clairvoyance', args);
        bin.stdout.on('data', data => {
          const expected = `Coverage report generated to ${filepath}\n`;
          assert(data.toString() === expected);
        });
        bin.on('close', code => {
          assert(code === 0);
          resolve();
        });
      })
    )
    .then(() =>
      new Promise(resolve => {
        fs.stat(filepath, err => {
          assert(err === null);
          const content = fs.readFileSync(filepath).toString();
          const json = JSON.parse(content);
          const fileName = Object.keys(json)[0];
          assert(fileName.match('examples/simple/app.css'));
          resolve();
        });
      })
    );
  });
});
