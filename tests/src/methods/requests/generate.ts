import fsp from 'fs/promises';

import Mustache from 'mustache';

import openapitools from '../../../../openapitools.json';
import {
  createClientName,
  packageNames,
  capitalize,
  getOutputPath,
  createOutputDir,
  loadTemplates,
} from '../../utils';

import { loadCTS } from './cts';

const testPath = 'methods/requests';

export async function generateTests(
  language: string,
  client: string
): Promise<void> {
  const { requests: template, ...partialTemplates } = await loadTemplates({
    language,
    testPath,
  });
  const cts = (await loadCTS(client)).requests;
  await createOutputDir({ language, testPath });

  if (cts.length === 0) {
    return;
  }

  const code = Mustache.render(
    template,
    {
      import: packageNames[language][client],
      client: createClientName(client, language),
      blocks: cts,
      hasRegionalHost: openapitools['generator-cli'].generators[
        `${language}-${client}`
      ].additionalProperties.hasRegionalHost
        ? true
        : undefined,
      capitalize() {
        return function (text: string, render: (string) => string): string {
          return capitalize(render(text));
        };
      },
      escapeQuotes() {
        return function (text: string, render: (string) => string): string {
          return render(text).replace(/"/g, '\\"');
        };
      },
    },
    partialTemplates
  );

  await fsp.writeFile(getOutputPath({ language, client, testPath }), code);
}
