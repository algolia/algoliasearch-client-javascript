/* eslint-disable import/no-commonjs*/
const fs = require('fs-extra');
const execa = require('execa');

const targets = fs.readdirSync('packages').filter(f => fs.statSync(`packages/${f}`).isDirectory());
const exclude = {
  all: '__tests__',
  algoliasearch: 'builds|presets',
  transporter: 'concerns',
};

generateExports();
async function generateExports() {
  await Promise.all(
    targets.map(target =>
      execa(
        `barrelsby`,
        [
          `--directory=packages/${target}/src`,
          '--delete',
          '--location=all',
          `--exclude=${exclude.all}|${exclude[target]}`,
          '--singleQuotes',
        ],
        {
          stdio: 'inherit',
        }
      )
    )
  );
}
