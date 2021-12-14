/* eslint-disable no-console */
import fsp from 'fs/promises';
import path from 'path';

import Mustache from 'mustache';
import type { OpenAPIV3 } from 'openapi-types';
import SwaggerParser from 'swagger-parser';

import openapitools from '../openapitools.json';

const availableLanguages = ['javascript'] as const;
type Language = typeof availableLanguages[number];

type CTSBlock = {
  testName?: string;
  method: string;
  parameters: any[];
  request: {
    path: string;
    method: string;
    data?: string;
  };
};

// Array of test per client
type CTS = Record<string, CTSBlock[]>;

const extensionForLanguage: Record<Language, string> = {
  javascript: '.test.ts',
};

const cts: CTS = {};

// For each generator, we map the packageName with the language and client
const packageNames: Record<string, Record<Language, string>> = Object.entries(
  openapitools['generator-cli'].generators
).reduce((prev, [clientName, clientConfig]) => {
  const obj = prev;
  const [lang, client] = clientName.split('-') as [Language, string];

  if (!(lang in prev)) {
    obj[lang] = {};
  }

  obj[lang][client] = clientConfig.additionalProperties.packageName;

  return obj;
}, {} as Record<string, Record<string, string>>);

async function createOutputDir(language: Language): Promise<void> {
  await fsp.mkdir(`output/${language}`, { recursive: true });
}

async function* walk(
  dir: string
): AsyncGenerator<{ path: string; name: string }> {
  for await (const d of await fsp.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield { path: entry, name: d.name };
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadCTSForClient(client: string): Promise<CTSBlock[]> {
  // load the list of operations from the spec
  const spec = await SwaggerParser.validate(`../specs/${client}/spec.yml`);
  const operations = Object.values(spec.paths)
    .flatMap<OpenAPIV3.OperationObject>((p) => Object.values(p))
    .map((obj) => obj.operationId);

  const ctsClient: CTSBlock[] = [];

  for await (const file of walk(`./CTS/clients/${client}`)) {
    if (!file.name.endsWith('json')) {
      continue;
    }
    const operationId = file.name.replace('.json', '');
    const tests: CTSBlock[] = JSON.parse(
      (await fsp.readFile(file.path)).toString()
    );

    // check test validity against spec
    if (!operations.includes(operationId)) {
      throw new Error(
        `cannot find operationId ${operationId} for the ${client} client`
      );
    }

    for (const test of tests) {
      if (test.testName === undefined) {
        test.testName = test.method;
      }

      // for now we stringify all params for mustache to render them properly
      for (let i = 0; i < test.parameters.length; i++) {
        // delete the object name for now, but it could be use for `new $objectName(params)`
        delete test.parameters[i].$objectName;

        // include the `-last` param to join with comma in mustache
        test.parameters[i] = {
          value: JSON.stringify(test.parameters[i]),
          '-last': i === test.parameters.length - 1,
        };
      }

      // stringify request.data too
      test.request.data = JSON.stringify(test.request.data);
    }
    ctsClient.push(...tests);
  }
  return ctsClient;
}

async function loadCTS(): Promise<void> {
  for await (const { name: client } of await fsp.opendir('./CTS/clients/')) {
    cts[client] = await loadCTSForClient(client);
  }
}

async function loadTemplate(language: Language): Promise<string> {
  return (await fsp.readFile(`CTS/templates/${language}.mustache`)).toString();
}

async function generateCode(language: Language): Promise<void> {
  const template = await loadTemplate(language);
  await createOutputDir(language);
  for (const client in cts) {
    if (cts[client].length === 0) {
      continue;
    }

    const code = Mustache.render(template, {
      import: packageNames[language][client],
      client: `${capitalize(client)}Api`,
      tests: cts[client],
    });
    await fsp.writeFile(
      `output/${language}/${client}${extensionForLanguage[language]}`,
      code
    );
  }
}

function printUsage(): void {
  console.log(`usage: generateCTS all | language1 language2...`);
  console.log(`\tavailable languages: ${availableLanguages.join(',')}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

async function parseCLI(args: string[]): Promise<void> {
  if (args.length < 3) {
    console.log('not enough arguments');
    printUsage();
  }

  let toGenerate: Language[];
  if (args.length === 3 && args[2] === 'all') {
    toGenerate = [...availableLanguages];
  } else {
    const languages = args[2].split(' ') as Language[];
    const unknownLanguages = languages.filter(
      (lang) => !availableLanguages.includes(lang)
    );
    if (unknownLanguages.length > 0) {
      console.log('unkown language(s): ', unknownLanguages.join(', '));
      printUsage();
    }
    toGenerate = languages;
  }

  try {
    await loadCTS();
    for (const lang of toGenerate) {
      generateCode(lang);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
  }
}

parseCLI(process.argv);
