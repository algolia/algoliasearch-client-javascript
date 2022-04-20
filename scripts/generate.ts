import { buildSpecs } from './buildSpecs';
import { buildCustomGenerators, CI, run } from './common';
import { getCustomGenerator, getLanguageFolder } from './config';
import { formatter } from './formatter';
import { createSpinner } from './oraLog';
import { removeExistingCodegen, setDefaultGeneratorOptions } from './pre-gen';
import type { Generator } from './types';

async function preGen(gen: Generator, verbose?: boolean): Promise<void> {
  await removeExistingCodegen(gen, verbose);

  await setDefaultGeneratorOptions(gen);
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
