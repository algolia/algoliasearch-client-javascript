import fsp from 'fs/promises';

import Mustache from 'mustache';

import { createSpinner } from '../../../oraLog';
import type { Generator } from '../../../types';
import {
  createClientName,
  capitalize,
  getOutputPath,
  createOutputDir,
  loadTemplates,
} from '../../utils';

import { loadRequestsCTS } from './cts';

const testPath = 'methods/requests';

export async function generateRequestsTests(
  {
    language,
    client,
    additionalProperties: { hasRegionalHost, packageName },
  }: Generator,
  verbose: boolean
): Promise<void> {
  createSpinner({ text: 'generating requests tests', indent: 4 }, verbose)
    .start()
    .info();
  const spinner = createSpinner(
    { text: 'loading templates', indent: 8 },
    verbose
  ).start();
  const { requests: template, ...partialTemplates } = await loadTemplates({
    language,
    testPath,
  });

  spinner.text = 'loading CTS';
  const cts = await loadRequestsCTS(client);

  if (cts.length === 0) {
    spinner.warn("skipping because tests doesn't exist");
    return;
  }

  await createOutputDir({ language, testPath });

  spinner.text = 'rendering templates';
  const code = Mustache.render(
    template,
    {
      import: packageName,
      client: createClientName(client, language),
      blocks: cts,
      hasRegionalHost: hasRegionalHost ? true : undefined,
      capitalize() {
        return function (text: string, render: (t: string) => string): string {
          return capitalize(render(text));
        };
      },
      escapeQuotes() {
        return function (text: string, render: (t: string) => string): string {
          return render(text).replace(/"/g, '\\"');
        };
      },
    },
    partialTemplates
  );

  await fsp.writeFile(getOutputPath({ language, client, testPath }), code);
  spinner.succeed();
}
