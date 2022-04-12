import fsp from 'fs/promises';
import path from 'path';

import execa from 'execa';
import semver from 'semver';

async function publish(): Promise<void> {
  // Read the local version of `algoliasearch/package.json`
  const { version } = JSON.parse(
    (
      await fsp.readFile(
        path.resolve(
          __dirname,
          '..',
          'packages',
          'algoliasearch',
          'package.json'
        )
      )
    ).toString()
  );

  // Get tag like `alpha`, `beta`, ...
  const tag = semver.prerelease(version)?.[0];

  await execa.command(
    `lerna exec --no-bail npm publish --access public ${
      tag ? `--tag ${tag}` : ''
    }`,
    {
      shell: 'bash',
    }
  );
}

publish();
