import fs from 'fs';

/**
 * Write a coverage file.
 * @param {Object} result - coverage data
 */
export default function (result) {
  fs.mkdir('coverage', () => {
    const data = JSON.stringify(result);
    fs.writeFile('coverage/css-coverage.json', data);

    console.log('Coverage report generated to coverage/css-coverage.json');
  });
}
