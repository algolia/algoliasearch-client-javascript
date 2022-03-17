import { buildJSClientUtils } from './buildClients';
import { buildSpecs } from './buildSpecs';
import { buildCustomGenerators, CI, run, runIfExists } from './common';
import { getCustomGenerator, getLanguageFolder } from './config';
import { formatter } from './formatter';
import { createSpinner } from './oraLog';
import { setHostsOptions } from './pre-gen/setHostsOptions';
import type { Generator } from './types';

async function preGen(
  { language, client, key, output }: Generator,
  verbose?: boolean
): Promise<void> {
  await runIfExists(`./scripts/pre-gen/${language}.sh`, `${output} ${key}`, {
    verbose,
  });

  await setHostsOptions({ client, key });
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

    // JavaScript utils are tested independently, we only build them
    // during dev to ease the process
    if (!CI && lang === 'javascript') {
      await buildJSClientUtils(verbose, 'all');
    }
  }
}
