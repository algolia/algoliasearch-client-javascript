import path from 'path';

import { run, toAbsolutePath } from '../common';
import { getLanguageApiFolder, getLanguageModelFolder } from '../config';
import { createClientName } from '../cts/utils';
import type { Generator } from '../types';

/**
 * Remove `model` folder for the current language and client.
 */
export async function removeExistingCodegen(
  { language, client, output }: Generator,
  verbose?: boolean
): Promise<void> {
  const baseModelFolder = getLanguageModelFolder(language);
  const baseApiFolder = getLanguageApiFolder(language);
  const clientName = createClientName(client, language);

  let clientModel = '';
  let clientApi = '';
  switch (language) {
    case 'java':
      clientModel = client;
      clientApi = `${clientName}*.java`;
      break;
    case 'php':
      clientModel = clientName;
      clientApi = `${clientName}*.php`;
      break;
    default:
      break;
  }

  // Delete client model folder/file
  await run(
    `rm -rf ${toAbsolutePath(
      path.resolve('..', output, baseModelFolder, clientModel)
    )}`,
    {
      verbose,
    }
  );

  // Delete client api folder/file
  await run(
    `rm -rf ${toAbsolutePath(
      path.resolve('..', output, baseApiFolder, clientApi)
    )}`,
    {
      verbose,
    }
  );
}
