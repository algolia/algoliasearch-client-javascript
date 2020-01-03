/* eslint-disable import/no-commonjs*/

const execa = require('execa');
const targets = require('./packages');

run();

async function run() {
  await Promise.all(
    targets
      .map(target => `./packages/${target}/package.json`)
      .concat('./package.json')
      .map(targetPackageJson => {
        return execa(`sort-package-json`, [targetPackageJson], {
          stdio: 'inherit',
        });
      })
  );
}
