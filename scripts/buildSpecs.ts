import fsp from 'fs/promises';

import yaml from 'js-yaml';

import { checkForCache, exists, run, toAbsolutePath } from './common';
import { createSpinner } from './oraLog';
import type { Spec } from './pre-gen/setHostsOptions';

async function propagateTagsToOperations(
  bundledPath: string
): Promise<boolean> {
  if (!(await exists(bundledPath))) {
    throw new Error(`Bundled file not found ${bundledPath}.`);
  }

  const bundledSpec = yaml.load(
    await fsp.readFile(bundledPath, 'utf8')
  ) as Spec;

  if (bundledSpec.tags.length === 0) {
    throw new Error(
      `No tags defined for ${bundledPath}, tags are required to properly generate a client.`
    );
  }

  const tagsName = bundledSpec.tags.map((tag) => tag.name);

  for (const pathMethods of Object.values(bundledSpec.paths)) {
    for (const specMethod of Object.values(pathMethods)) {
      specMethod.tags = tagsName;
    }
  }

  await fsp.writeFile(
    bundledPath,
    yaml.dump(bundledSpec, {
      noRefs: true,
    })
  );

  return true;
}

async function buildSpec(
  client: string,
  outputFormat: string,
  verbose: boolean,
  useCache: boolean
): Promise<void> {
  createSpinner(`'${client}' spec`, verbose).start().info();
  const cacheFile = toAbsolutePath(`specs/dist/${client}.cache`);
  let hash = '';

  if (useCache) {
    const { cacheExists, hash: newCache } = await checkForCache(
      {
        job: `'${client}' specs`,
        folder: toAbsolutePath('specs/'),
        generatedFiles: [`bundled/${client}.yml`],
        filesToCache: [client, 'common'],
        cacheFile,
      },
      verbose
    );

    if (cacheExists) {
      return;
    }

    hash = newCache;
  }

  const spinner = createSpinner(`building ${client} spec`, verbose).start();
  const bundledPath = `specs/bundled/${client}.${outputFormat}`;
  await run(
    `yarn openapi bundle specs/${client}/spec.yml -o ${bundledPath} --ext ${outputFormat}`,
    { verbose }
  );

  if (
    (await propagateTagsToOperations(toAbsolutePath(bundledPath))) === false
  ) {
    spinner.fail();
    throw new Error(
      `Unable to propage tags to operations for \`${client}\` spec.`
    );
  }

  spinner.text = `linting ${client} spec`;
  await run(`yarn specs:lint ${client}`, { verbose });

  spinner.text = `validating ${client} spec`;
  await run(`yarn openapi lint specs/bundled/${client}.${outputFormat}`, {
    verbose,
  });

  spinner.text = `linting '${client}' bundled spec`;
  await run(`yarn specs:fix bundled/${client}.${outputFormat}`, { verbose });

  if (hash) {
    spinner.text = `storing ${client} spec cache`;
    await fsp.writeFile(cacheFile, hash);
  }

  spinner.succeed(`building complete for '${client}' spec`);
}

export async function buildSpecs(
  clients: string[],
  outputFormat: 'json' | 'yml',
  verbose: boolean,
  useCache: boolean
): Promise<void> {
  await fsp.mkdir(toAbsolutePath('specs/dist'), { recursive: true });

  await Promise.all(
    clients.map((client) => buildSpec(client, outputFormat, verbose, useCache))
  );
}
