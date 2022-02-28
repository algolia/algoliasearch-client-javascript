import { buildSpecs } from './buildSpecs';
import { CI, run, runIfExists } from './common';
import { getLanguageFolder } from './config';
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
  { key }: Generator,
  verbose?: boolean
): Promise<void> {
  await run(`yarn openapi-generator-cli generate --generator-key ${key}`, {
    verbose,
  });
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

  const langs = [...new Set(generators.map((gen) => gen.language))];
  for (const lang of langs) {
    if (!(CI && lang === 'javascript')) {
      await formatter(lang, getLanguageFolder(lang), verbose);
    }

    // build common packages
    if (lang === 'javascript') {
      const spinner = createSpinner(
        'cleaning JavaScript client utils',
        verbose
      ).start();
      await run('yarn workspace algoliasearch-client-javascript clean:utils', {
        verbose,
      });
      spinner.text = 'building JavaScript client utils';
      await run('yarn workspace algoliasearch-client-javascript build:utils', {
        verbose,
      });

      spinner.succeed();
    }
  }

  if (!CI) {
    const spinner = createSpinner('formatting specs', verbose).start();
    await run(`yarn specs:fix`, { verbose });
    spinner.succeed();
  }
}
