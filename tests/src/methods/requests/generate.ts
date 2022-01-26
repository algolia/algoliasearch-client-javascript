import fsp from 'fs/promises';

import Mustache from 'mustache';

import openapitools from '../../../../openapitools.json';
import {
  createClientName,
  packageNames,
  extensionForLanguage,
  sourcePathForLanguage,
  capitalize,
} from '../../utils';

import { loadCTS } from './cts';
import { loadPartials, loadRequestsTemplate } from './templates';
import type { CTSBlock } from './types';

async function createOutputDir(language: string): Promise<void> {
  await fsp.mkdir(`output/${language}/${sourcePathForLanguage[language]}`, {
    recursive: true,
  });
}

async function generateRequestsTests(
  cts: CTSBlock[],
  template: string,
  language: string,
  client: string,
  partials: Record<string, string>
): Promise<void> {
  if (cts.length === 0) {
    return;
  }

  const code = Mustache.render(
    template,
    {
      import: packageNames[language][client],
      client: createClientName(client),
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
    partials
  );

  await fsp.writeFile(
    `output/${language}/${sourcePathForLanguage[language]}/${client}.${extensionForLanguage[language]}`,
    code
  );
}

export async function generateTests(
  language: string,
  client: string
): Promise<void> {
  const template = await loadRequestsTemplate(language);
  const cts = await loadCTS(client);
  const partials = await loadPartials(language);

  await createOutputDir(language);

  await generateRequestsTests(
    cts.requests,
    template,
    language,
    client,
    partials
  );
}
