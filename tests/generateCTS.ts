/* eslint-disable no-console */
import fsp from 'fs/promises';
import path from 'path';

import SwaggerParser from '@apidevtools/swagger-parser';
import Mustache from 'mustache';
import type { OpenAPIV3 } from 'openapi-types';

import openapitools from '../openapitools.json';

const availableLanguages = ['javascript'] as const;
type Language = typeof availableLanguages[number];
type ParametersWithDataType = {
  key: string;
  value: string;
  isDate: boolean;
  isArray: boolean;
  isObject: boolean;
  isString: boolean;
  '-last': boolean;
};

// This does not reflect the expected type of the CTS, it's rather the type passed to mustache
type Tests = {
  testName?: string;
  method: string;
  parameters: any;
  parametersWithDataType: ParametersWithDataType[] | undefined;
  hasParameters: boolean;
  request: {
    path: string;
    method: string;
    data?: string;
    searchParams?: string;
  };
};

type CTSBlock = {
  operationId: string;
  tests: Tests[];
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
  const parts = clientName.split('-');
  const lang = parts[0] as Language;
  const client = parts.slice(1).join('-');

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

function createClientName(client: string): string {
  return `${client
    .split('-')
    .map((part) => capitalize(part))
    .join('')}Api`;
}

function removeObjectName(obj: Record<string, any>): void {
  for (const prop in obj) {
    if (prop === '$objectName') {
      // eslint-disable-next-line no-param-reassign
      delete obj[prop];
    } else if (typeof obj[prop] === 'object') {
      removeObjectName(obj[prop]);
    }
  }
}

async function loadCTSForClient(client: string): Promise<CTSBlock[]> {
  // load the list of operations from the spec
  const spec = await SwaggerParser.validate(`../specs/${client}/spec.yml`);
  if (!spec.paths) {
    throw new Error(`No paths found for spec ${client}/spec.yml`);
  }

  const operations = Object.values(spec.paths)
    .flatMap<OpenAPIV3.OperationObject>((p) => Object.values(p))
    .map((obj) => obj.operationId);

  const ctsClient: CTSBlock[] = [];

  for await (const file of walk(`./CTS/clients/${client}`)) {
    if (!file.name.endsWith('json')) {
      continue;
    }
    const fileName = file.name.replace('.json', '');
    const fileContent = (await fsp.readFile(file.path)).toString();

    if (!fileContent) {
      throw new Error(`cannot read empty file ${fileName} - ${client} client`);
    }

    const tests: Tests[] = JSON.parse(fileContent);

    // check test validity against spec
    if (!operations.includes(fileName)) {
      throw new Error(`cannot find ${fileName} for the ${client} client`);
    }

    for (const test of tests) {
      if (test.testName === undefined) {
        test.testName = test.method;
      }

      // stringify request.data too
      test.request.data = JSON.stringify(test.request.data);
      test.request.searchParams = JSON.stringify(test.request.searchParams);

      if (Object.keys(test.parameters).length === 0) {
        test.parameters = undefined;
        test.parametersWithDataType = undefined;
        test.hasParameters = false;

        continue;
      }

      if (
        typeof test.parameters !== 'object' ||
        Array.isArray(test.parameters)
      ) {
        throw new Error(`parameters of ${test.testName} must be an object`);
      }

      // we stringify the param for mustache to render them properly
      // delete the object name recursively for now, but it could be use for `new $objectName(params)`
      removeObjectName(test.parameters);

      // Provide the `key` and `is*` params to apply custom logic in templates
      // include the `-last` param to join with comma in mustache
      test.parametersWithDataType = Object.entries(test.parameters).map(
        ([key, value], i, arr) => {
          const isDate = key === 'endAt';
          const isArray = Array.isArray(value);

          return {
            key,
            value: JSON.stringify(value),
            isString: typeof value === 'string' && isDate === false,
            isObject: typeof value === 'object' && isArray === false,
            isArray,
            isDate,
            '-last': i === arr.length - 1,
          };
        }
      );

      if (fileName === 'getDictionarySettings') {
        console.log(test.parameters, test.parametersWithDataType);
      }

      test.parameters = JSON.stringify(test.parameters);
      test.hasParameters = true;
    }

    ctsClient.push({
      operationId: fileName,
      tests,
    });
  }

  return ctsClient.sort((t1, t2) =>
    t1.operationId.localeCompare(t2.operationId)
  );
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
      client: createClientName(client),
      blocks: cts[client],
      hasRegionalHost: [
        'personalization',
        'analytics',
        'abtesting',
        'query-suggestions',
      ].includes(client),
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
