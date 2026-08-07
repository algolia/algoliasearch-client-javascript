import { execa } from 'execa';

async function publish(): Promise<void> {
  // publish the stable public packages
  await execa(
    `yarn lerna exec --no-bail -- npm_config_registry=https://registry.npmjs.org/ npm publish --access public`,
    {
      shell: 'bash',
    },
  );

  // publish the prereleases private packages if any
  // await execa(
  //   `yarn lerna exec --scope '<the private package>' --no-bail -- npm_config_registry=https://registry.npmjs.org/ npm publish --access private --tag alpha --tag latest`,
  //   {
  //     shell: 'bash',
  //   },
  // );
}

publish();
