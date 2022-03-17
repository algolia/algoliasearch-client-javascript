import { buildCustomGenerators, run, toAbsolutePath } from '../common';
import { getTestOutputFolder } from '../config';
import { formatter } from '../formatter';
import { createSpinner } from '../oraLog';
import type { Generator } from '../types';

import { generateClientTests } from './client/generate';

async function ctsGenerate(gen: Generator, verbose: boolean): Promise<void> {
  createSpinner(`generating CTS for ${gen.key}`, verbose).start().info();
  const spinner = createSpinner(
    { text: 'generating requests tests', indent: 4 },
    verbose
  ).start();
  await run(
    `yarn openapi-generator-cli --custom-generator=generators/build/libs/algolia-java-openapi-generator-1.0.0.jar generate \
     -g algolia-cts -i specs/bundled/${gen.client}.yml --additional-properties="language=${gen.language},client=${gen.client},packageName=${gen.additionalProperties.packageName},hasRegionalHost=${gen.additionalProperties.hasRegionalHost}"`,
    { verbose }
  );
  spinner.succeed();
  switch (gen.language) {
    case 'javascript':
      await generateClientTests(gen, verbose);
      break;
    default:
  }
}

export async function ctsGenerateMany(
  generators: Generator[],
  verbose: boolean
): Promise<void> {
  await buildCustomGenerators(verbose);

  for (const gen of generators) {
    if (!getTestOutputFolder(gen.language)) {
      continue;
    }
    await ctsGenerate(gen, verbose);
  }

  const langs = [...new Set(generators.map((gen) => gen.language))];
  for (const lang of langs) {
    if (!getTestOutputFolder(lang)) {
      continue;
    }
    await formatter(
      lang,
      toAbsolutePath(`tests/output/${lang}/${getTestOutputFolder(lang)}`),
      verbose
    );
  }
}
