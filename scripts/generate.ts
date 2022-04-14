import path from 'path';

import { buildSpecs } from './buildSpecs';
import {
  buildCustomGenerators,
  CI,
  run,
  runIfExists,
  toAbsolutePath,
} from './common';
import {
  getCustomGenerator,
  getLanguageFolder,
  getLanguageModelFolder,
} from './config';
import { createClientName } from './cts/utils';
import { formatter } from './formatter';
import { createSpinner } from './oraLog';
import { setHostsOptions } from './pre-gen/setHostsOptions';
import type { Generator } from './types';

/**
 * Remove `model` folder for the current language and client.
 */
async function removeExistingModel(
  { language, client, output }: Generator,
  verbose?: boolean
): Promise<void> {
  const baseModelFolder = getLanguageModelFolder(language);

  let clientModel = '';
  switch (language) {
    case 'java':
      clientModel = client;
      break;
    case 'php':
      clientModel = createClientName(client, 'php');
      break;
    default:
      break;
  }

  await run(
    `rm -rf ${toAbsolutePath(
      path.resolve('..', output, baseModelFolder, clientModel)
    )}`,
    {
      verbose,
    }
  );
}

async function preGen(gen: Generator, verbose?: boolean): Promise<void> {
  // Run bash pre-gen script
  await runIfExists(
    `./scripts/pre-gen/${gen.language}.sh`,
    `${gen.output} ${gen.key}`,
    {
      verbose,
    }
  );

  await removeExistingModel(gen);

  // Updates `openapitools.json` file based on the spec `servers`
  await setHostsOptions({ client: gen.client, key: gen.key });
}

async function generateClient(
  { language, key }: Generator,
  verbose?: boolean
): Promise<void> {
  const customGenerator = getCustomGenerator(language);
  await run(
    `yarn openapi-generator-cli ${
      customGenerator
        ? '--custom-generator=generators/build/libs/algolia-java-openapi-generator-1.0.0.jar'
        : ''
    } generate --generator-key ${key}`,
    {
      verbose,
    }
  );
}

async function postGen(
  { language, key, output }: Generator,
  verbose?: boolean
): Promise<void> {
  await runIfExists(`./scripts/post-gen/${language}.sh`, `${output} ${key}`, {
    verbose,
  });
}

export async function generate(
  generators: Generator[],
  verbose: boolean
): Promise<void> {
  if (!CI) {
    const clients = [...new Set(generators.map((gen) => gen.client))];
    await buildSpecs(clients, 'yml', verbose, true);
  }

  const availableWorkspaces = await run('yarn workspaces list', { verbose });
  const langs = [...new Set(generators.map((gen) => gen.language))];
  const useCustomGenerator = langs
    .map((lang) => getCustomGenerator(lang))
    .some(Boolean);
  if (useCustomGenerator) {
    await buildCustomGenerators(verbose);
  }

  for (const gen of generators) {
    const spinner = createSpinner(`pre-gen ${gen.key}`, verbose).start();
    await preGen(gen, verbose);

    spinner.text = `generating ${gen.key}`;
    await generateClient(gen, verbose);

    // Prevents the CI/CLI to throw when a new JS client is generated
    // by linking it if it's not the case
    if (
      gen.language === 'javascript' &&
      !availableWorkspaces.includes(gen.output)
    ) {
      spinner.text = `First time generating ${gen.client}, linking to workspaces`;

      await run('YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn', { verbose });
    }

    spinner.text = `post-gen ${gen.key}`;
    await postGen(gen, verbose);

    if (CI && gen.language === 'javascript') {
      // because the CI is parallelized, run the formatter for each client
      await formatter(gen.language, gen.output, verbose);
    }

    spinner.succeed();
  }

  for (const lang of langs) {
    if (!(CI && lang === 'javascript')) {
      await formatter(lang, getLanguageFolder(lang), verbose);
    }
  }
}
