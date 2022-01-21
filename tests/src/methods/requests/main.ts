/* eslint-disable no-console */

import { packageNames } from '../../utils';

import { generateTests } from './generate';

function printUsage(): void {
  console.log(`usage: generateCTS language client`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

async function parseCLI(args: string[]): Promise<void> {
  if (args.length < 3) {
    console.log('not enough arguments');
    printUsage();
  }

  const lang = args[2];
  const client = args[3];

  if (!(lang in packageNames)) {
    console.log('Unknown language', lang);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
  if (!(client in packageNames[lang])) {
    console.log('Unknown client', client);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  console.log(`Generating CTS for ${lang}-${client}`);

  try {
    await generateTests(args[2], args[3]);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
  }
}

parseCLI(process.argv);
