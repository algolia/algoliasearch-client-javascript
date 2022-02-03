import { parseCLI, checkIfLanguageExists } from '../utils';

import { generateTests } from './generate';

async function main(): Promise<void> {
  const { lang, client } = parseCLI(process.argv, 'generate:client');

  if (!checkIfLanguageExists(lang)) {
    // eslint-disable-next-line no-console
    console.log(
      `Skipping CTS generation > generate:client for ${lang}-${client}: Language not present in the config.json file`
    );

    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Generating CTS > generate:client for ${lang}-${client}`);

  try {
    await generateTests(lang, client);
  } catch (e) {
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

main();
