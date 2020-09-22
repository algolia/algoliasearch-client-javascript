/* eslint-disable functional/immutable-data */
/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');

module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*'],
  },
  getTagName: ({ version }) => `${version}`,
  conventionalChangelogArgs:
    '--config conventional-changelog.config.js --infile CHANGELOG.md --same-file',
  versionUpdated({ version, dir }) {
    // Update version in `lerna.json` file.
    const lernaConfigPath = path.resolve(dir, 'lerna.json');
    const lernaConfig = JSON.parse(fs.readFileSync(lernaConfigPath).toString());
    lernaConfig.version = version;
    fs.writeFileSync(lernaConfigPath, JSON.stringify(lernaConfig, null, 2));

    // Update version in `packages/client-common/src/version.ts` file since
    // `shipjs prepare` does not seem to support Typescript version files
    // bumping (yet?).
    const clientCommonTypescriptPath = 'packages/client-common/src/version.ts';
    const clientCommonTypescript = path.resolve(dir, clientCommonTypescriptPath);
    fs.writeFileSync(clientCommonTypescript, `export const version = '${version}';\n`);
  },
};
