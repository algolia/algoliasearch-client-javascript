import { buildJSClientUtils } from './buildClients';
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
  { language, key }: Generator,
  verbose?: boolean
): Promise<void> {
  if (language === 'java') {
    // eslint-disable-next-line no-warning-comments
    // TODO: We can remove this once https://github.com/OpenAPITools/openapi-generator-cli/issues/439 is fixed
    await run(
      `./gradle/gradlew --no-daemon -p generators assemble && \
       java -cp /tmp/openapi-generator-cli.jar:generators/build/libs/algolia-java-openapi-generator-1.0.0.jar -ea org.openapitools.codegen.OpenAPIGenerator generate -c config/openapitools-java.json`,
      { verbose }
    );
    return;
  }
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

    // JavaScript utils are tested independently, we only build them
    // during dev to ease the process
    if (!CI && lang === 'javascript') {
      await buildJSClientUtils(verbose, 'all');
    }
  }

  if (!CI) {
    const spinner = createSpinner('formatting specs', verbose).start();
    await run(`yarn specs:fix`, { verbose });
    spinner.succeed();
  }
}
