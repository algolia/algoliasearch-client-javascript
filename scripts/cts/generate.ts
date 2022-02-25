import { toAbsolutePath } from '../common';
import { getTestOutputFolder } from '../config';
import { formatter } from '../formatter';
import { createSpinner } from '../oraLog';
import type { Generator } from '../types';

import { generateClientTests } from './client/generate';
import { generateRequestsTests } from './methods/requests/generate';

async function ctsGenerate(
  generator: Generator,
  verbose: boolean
): Promise<void> {
  createSpinner(`generating CTS for ${generator.key}`, verbose).start().info();
  switch (generator.language) {
    case 'javascript':
    case 'java':
      await generateRequestsTests(generator, verbose);
      await generateClientTests(generator, verbose);
      break;
    default:
  }
}

export async function ctsGenerateMany(
  generators: Generator[],
  verbose: boolean
): Promise<void> {
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
