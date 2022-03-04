import { run, toAbsolutePath } from '../common';
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
      await generateRequestsTests(generator, verbose);
      await generateClientTests(generator, verbose);
      break;
    case 'java':
      // eslint-disable-next-line no-warning-comments
      // TODO: We can remove this once https://github.com/OpenAPITools/openapi-generator-cli/issues/439 is fixed,
      // and just call it with `yarn openapi-generator-cli --custom-generator=generators/build/libs/algolia-java-openapi-generator-1.0.0.jar`
      await run(
        `./gradle/gradlew --no-daemon -p generators assemble && \
             java -cp /tmp/openapi-generator-cli.jar:generators/build/libs/algolia-java-openapi-generator-1.0.0.jar -ea org.openapitools.codegen.OpenAPIGenerator generate -c config/openapitools-java-cts.json`,
        { verbose }
      );
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
