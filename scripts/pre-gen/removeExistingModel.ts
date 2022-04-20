import path from 'path';

import { run, toAbsolutePath } from '../common';
import { getLanguageModelFolder } from '../config';
import { createClientName } from '../cts/utils';
import type { Generator } from '../types';

/**
 * Remove `model` folder for the current language and client.
 */
export async function removeExistingModel(
  { language, client, output }: Generator,
  verbose?: boolean
): Promise<void> {
  const baseModelFolder = getLanguageModelFolder(language);

  let clientModel = '';
  switch (language) {
    case 'java':
      clientModel = client;
      break;
    case 'php':
      clientModel = createClientName(client, 'php');
      break;
    default:
      break;
  }

  await run(
    `rm -rf ${toAbsolutePath(
      path.resolve('..', output, baseModelFolder, clientModel)
    )}`,
    {
      verbose,
    }
  );
}
