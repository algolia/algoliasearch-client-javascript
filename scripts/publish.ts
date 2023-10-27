import { execaCommand } from 'execa';
import semver from 'semver';

import packageJSON from "../packages/algoliasearch/package.json" assert { type: "json" };

async function publish(): Promise<void> {
  // Get tag like `alpha`, `beta`, ...
  const tag = semver.prerelease(packageJSON.version)?.[0];

  await execaCommand(
    `yarn lerna exec --no-bail -- npm_config_registry=https://registry.npmjs.org/ npm publish --access public ${
      tag ? `--tag ${tag}` : ''
    }`,
    {
      shell: 'bash',
    }
  );
}

publish();
