/* eslint-disable no-param-reassign */
import { Argument, program } from 'commander';
import inquirer from 'inquirer';

import { buildClients } from './buildClients';
import { buildSpecs } from './buildSpecs';
import {
  CI,
  CLIENTS,
  CLIENTS_JS,
  CLIENTS_JS_UTILS,
  createGeneratorKey,
  DOCKER,
  GENERATORS,
  LANGUAGES,
} from './common';
import { ctsGenerateMany } from './cts/generate';
import { runCts } from './cts/runCts';
import { formatter } from './formatter';
import { generate } from './generate';
import { playground } from './playground';
import type { Generator } from './types';

if (!CI && !DOCKER) {
  // eslint-disable-next-line no-console
  console.log('You should run scripts via the docker container, see README.md');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

program.name('cli');

async function promptLanguage(
  defaut: string | undefined,
  interactive: boolean
): Promise<string> {
  if (defaut) {
    return defaut;
  }
  if (!interactive) {
    return 'all';
  }
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Select a language',
      default: 'all',
      choices: ['all', new inquirer.Separator()].concat(LANGUAGES),
    },
  ]);
  return language;
}

async function promptClient(
  defaut: string | undefined,
  interactive: boolean,
  clientList = CLIENTS
): Promise<string> {
  if (defaut) {
    return defaut;
  }
  if (!interactive) {
    return 'all';
  }
  const { client } = await inquirer.prompt([
    {
      type: 'list',
      name: 'client',
      message: 'Select a client',
      default: 'all',
      choices: ['all', new inquirer.Separator()].concat(clientList),
    },
  ]);
  return client;
}

function generatorList({
  language,
  client,
  clientList = CLIENTS,
}: Pick<Generator, 'client' | 'language'> & {
  clientList?: string[];
}): Generator[] {
  let langsTodo = [language];
  let clientsTodo = [client];
  if (language === 'all') {
    langsTodo = LANGUAGES;
  }
  if (client === 'all') {
    clientsTodo = clientList;
  }

  return langsTodo
    .flatMap((lang) =>
      clientsTodo.map(
        (cli) => GENERATORS[createGeneratorKey({ language: lang, client: cli })]
      )
    )
    .filter(Boolean);
}

program
  .command('generate')
  .description('Generate a specified client')
  .addArgument(
    new Argument('[language]', 'The language').choices(
      ['all'].concat(LANGUAGES)
    )
  )
  .addArgument(
    new Argument('[client]', 'The client').choices(['all'].concat(CLIENTS))
  )
  .option('-v, --verbose', 'make the generation verbose')
  .option('-i, --interactive', 'open prompt to query parameters')
  .action(
    async (
      language: string | undefined,
      client: string | undefined,
      { verbose, interactive }
    ) => {
      language = await promptLanguage(language, interactive);
      client = await promptClient(client, interactive);

      await generate(generatorList({ language, client }), Boolean(verbose));
    }
  );

const buildCommand = program.command('build');

buildCommand
  .command('clients')
  .description('Build a specified client')
  .addArgument(
    new Argument('[language]', 'The language').choices(
      ['all'].concat(LANGUAGES)
    )
  )
  .addArgument(
    new Argument('[client]', 'The client').choices(
      ['all'].concat([...CLIENTS_JS_UTILS, ...CLIENTS_JS])
    )
  )
  .option('-v, --verbose', 'make the compilation verbose')
  .option('-i, --interactive', 'open prompt to query parameters')
  .action(
    async (
      language: string | undefined,
      client: string | undefined,
      { verbose, interactive }
    ) => {
      language = await promptLanguage(language, interactive);

      const clientList =
        language === 'javascript' || language === 'all' ? CLIENTS_JS : CLIENTS;
      client = await promptClient(client, interactive, clientList);

      await buildClients(
        generatorList({ language, client, clientList }),
        Boolean(verbose)
      );
    }
  );

buildCommand
  .command('specs')
  .description('Build a specified spec')
  .addArgument(
    new Argument('[client]', 'The client').choices(['all'].concat(CLIENTS))
  )
  .addArgument(
    new Argument('[output-format]', 'The output format').choices([
      'yml',
      'json',
    ])
  )
  .option('-v, --verbose', 'make the verification verbose')
  .option('-i, --interactive', 'open prompt to query parameters')
  .option('-s, --skip-cache', 'skip cache checking to force building specs')
  .action(
    async (
      client: string | undefined,
      outputFormat: 'json' | 'yml' | undefined,
      { verbose, interactive, skipCache }
    ) => {
      client = await promptClient(client, interactive);

      if (!outputFormat) {
        outputFormat = 'yml';
      }

      let clientsTodo = [client];
      if (client === 'all') {
        clientsTodo = CLIENTS;
      }
      // ignore cache when building from cli
      await buildSpecs(
        clientsTodo,
        outputFormat!,
        Boolean(verbose),
        !skipCache
      );
    }
  );

const ctsCommand = program.command('cts');

ctsCommand
  .command('generate')
  .description('Generate the CTS tests')
  .addArgument(
    new Argument('[language]', 'The language').choices(
      ['all'].concat(LANGUAGES)
    )
  )
  .addArgument(
    new Argument('[client]', 'The client').choices(['all'].concat(CLIENTS))
  )
  .option('-v, --verbose', 'make the generation verbose')
  .option('-i, --interactive', 'open prompt to query parameters')
  .action(
    async (
      language: string | undefined,
      client: string | undefined,
      { verbose, interactive }
    ) => {
      language = await promptLanguage(language, interactive);
      client = await promptClient(client, interactive);

      await ctsGenerateMany(
        generatorList({ language, client }),
        Boolean(verbose)
      );
    }
  );

ctsCommand
  .command('run')
  .description('Run the tests for the CTS')
  .addArgument(
    new Argument('[language]', 'The language').choices(
      ['all'].concat(LANGUAGES)
    )
  )
  .option('-v, --verbose', 'make the generation verbose')
  .option('-i, --interactive', 'open prompt to query parameters')
  .action(async (language: string | undefined, { verbose, interactive }) => {
    language = await promptLanguage(language, interactive);

    let langsTodo = [language];
    if (language === 'all') {
      langsTodo = LANGUAGES;
    }
    await runCts(langsTodo, Boolean(verbose));
  });

program
  .command('playground')
  .description('Run the playground')
  .addArgument(new Argument('[language]', 'The language').choices(LANGUAGES))
  .addArgument(
    new Argument('[client]', 'The client').choices(['all'].concat(CLIENTS))
  )
  .option('-i, --interactive', 'open prompt to query parameters')
  .action(
    async (
      language: string | undefined,
      client: string | undefined,
      { interactive }
    ) => {
      language = await promptLanguage(language, interactive);
      client = await promptClient(client, interactive);

      await playground({
        language,
        client,
      });
    }
  );

program
  .command('format')
  .description('Format the specified folder for a specific language')
  .addArgument(new Argument('language', 'The language').choices(LANGUAGES))
  .argument('folder', 'The folder to format')
  .option('-v, --verbose', 'make the formatting verbose')
  .action(async (language: string, folder: string, { verbose }) => {
    await formatter(language, folder, verbose);
  });

program.parse();
