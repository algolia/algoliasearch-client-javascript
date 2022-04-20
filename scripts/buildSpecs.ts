import fsp from 'fs/promises';

import yaml from 'js-yaml';

import { checkForCache, exists, run, toAbsolutePath } from './common';
import { createSpinner } from './oraLog';
import type { Spec } from './types';

const ALGOLIASEARCH_LITE_OPERATIONS = [
  'search',
  'multipleQueries',
  'searchForFacetValues',
  'post',
];

async function propagateTagsToOperations(
  bundledPath: string,
  client: string
): Promise<boolean> {
  if (!(await exists(bundledPath))) {
    throw new Error(`Bundled file not found ${bundledPath}.`);
  }

  const bundledSpec = yaml.load(
    await fsp.readFile(bundledPath, 'utf8')
  ) as Spec;

  for (const pathMethods of Object.values(bundledSpec.paths)) {
    for (const specMethod of Object.values(pathMethods)) {
      specMethod.tags = [client];
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

async function lintCommon(verbose: boolean, useCache: boolean): Promise<void> {
  let hash = '';
  const cacheFile = toAbsolutePath(`specs/dist/common.cache`);
  if (useCache) {
    const { cacheExists, hash: newCache } = await checkForCache(
      {
        job: 'common specs',
        folder: toAbsolutePath('specs/'),
        generatedFiles: [],
        filesToCache: ['common'],
        cacheFile,
      },
      verbose
    );

    if (cacheExists) {
      return;
    }

    hash = newCache;
  }

  const spinner = createSpinner('linting common spec', verbose).start();
  await run(`yarn specs:lint common`, { verbose });

  if (hash) {
    spinner.text = `storing common spec cache`;
    await fsp.writeFile(cacheFile, hash);
  }

  spinner.succeed();
}

/**
 * Creates a lite search spec with the `ALGOLIASEARCH_LITE_OPERATIONS` methods
 * from the `search` spec.
 */
async function buildLiteSpec(
  spec: string,
  bundledPath: string,
  outputFormat: string,
  verbose: boolean
): Promise<void> {
  const searchSpec = yaml.load(
    await fsp.readFile(toAbsolutePath(bundledPath), 'utf8')
  ) as Spec;

  searchSpec.paths = Object.entries(searchSpec.paths).reduce(
    (acc, [path, operations]) => {
      for (const [method, operation] of Object.entries(operations)) {
        if (
          method === 'post' &&
          ALGOLIASEARCH_LITE_OPERATIONS.includes(operation.operationId)
        ) {
          return { ...acc, [path]: { post: operation } };
        }
      }

      return acc;
    },
    {} as Spec['paths']
  );

  const liteBundledPath = `specs/bundled/${spec}.${outputFormat}`;
  await fsp.writeFile(toAbsolutePath(liteBundledPath), yaml.dump(searchSpec));

  if (
    !(await propagateTagsToOperations(toAbsolutePath(liteBundledPath), spec))
  ) {
    throw new Error(
      `Unable to propage tags to operations for \`${spec}\` spec.`
    );
  }

  await run(`yarn specs:fix bundled/${spec}.${outputFormat}`, {
    verbose,
  });
}

async function buildSpec(
  spec: string,
  outputFormat: string,
  verbose: boolean,
  useCache: boolean
): Promise<void> {
  const shouldBundleLiteSpec = spec === 'algoliasearch-lite';
  const client = shouldBundleLiteSpec ? 'search' : spec;
  const cacheFile = toAbsolutePath(`specs/dist/${client}.cache`);
  let hash = '';

  createSpinner(`'${client}' spec`, verbose).start().info();

  if (useCache) {
    const generatedFiles = [`bundled/${client}.yml`];

    if (shouldBundleLiteSpec) {
      generatedFiles.push(`bundled/${spec}.yml`);
    }

    const { cacheExists, hash: newCache } = await checkForCache(
      {
        job: `'${client}' specs`,
        folder: toAbsolutePath('specs/'),
        generatedFiles,
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

  if (!(await propagateTagsToOperations(toAbsolutePath(bundledPath), client))) {
    spinner.fail();
    throw new Error(
      `Unable to propage tags to operations for \`${client}\` spec.`
    );
  }

  spinner.text = `linting ${client} spec`;
  await run(`yarn specs:fix ${client}`, { verbose });

  spinner.text = `validating ${client} spec`;
  await run(`yarn openapi lint specs/bundled/${client}.${outputFormat}`, {
    verbose,
  });

  spinner.text = `linting '${client}' bundled spec`;
  await run(`yarn specs:fix bundled/${client}.${outputFormat}`, { verbose });

  if (shouldBundleLiteSpec) {
    spinner.text = `Building and linting '${spec}' spec`;
    await buildLiteSpec(spec, bundledPath, outputFormat, verbose);
  }

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

  await lintCommon(verbose, useCache);

  await Promise.all(
    clients.map((client) => buildSpec(client, outputFormat, verbose, useCache))
  );
}
