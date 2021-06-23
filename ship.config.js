/* eslint-disable functional/immutable-data */
/* eslint-disable import/no-commonjs */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const path = require('path');

module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    // no packages should be versioned by shipjs, lerna should do it!
    packagesToBump: [],
    packagesToPublish: ['packages/*'],
  },
  getTagName: ({ version }) => `${version}`,
  conventionalChangelogArgs:
    '--config conventional-changelog.config.js --infile CHANGELOG.md --same-file',
  async versionUpdated({ version, dir }) {
    // Update version with lerna
    await exec(`lerna version ${version} --no-git-tag-version --no-push --exact --yes`);

    // Update version in `packages/client-common/src/version.ts` file since
    // `shipjs prepare` does not seem to support Typescript version files
    // bumping (yet?).
    const clientCommonTypescriptPath = 'packages/client-common/src/version.ts';
    const clientCommonTypescript = path.resolve(dir, clientCommonTypescriptPath);

    await fs.writeFile(clientCommonTypescript, `export const version = '${version}';\n`);
  },
};
