import fsp from 'fs/promises';
import path from 'path';

import openapitools from '../../openapitools.json';
import ctsConfig from '../CTS/config.json';

// For each generator, we map the packageName with the language and client
export const packageNames: Record<
  string,
  Record<string, string>
> = Object.entries(openapitools['generator-cli'].generators).reduce(
  (prev, [clientName, clientConfig]) => {
    const obj = prev;
    const parts = clientName.split('-');
    const lang = parts[0];
    const client = parts.slice(1).join('-');

    if (!(lang in prev)) {
      obj[lang] = {};
    }

    obj[lang][client] = clientConfig.additionalProperties.packageName;

    return obj;
  },
  {} as Record<string, Record<string, string>>
);

export async function* walk(
  dir: string
): AsyncGenerator<{ path: string; name: string }> {
  for await (const d of await fsp.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield { path: entry, name: d.name };
  }
}

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fsp.stat(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createClientName(client: string, language: string): string {
  const clientName = client
    .split('-')
    .map((part, i) => {
      if (language === 'javascript' && i === 0) {
        return part;
      }

      return capitalize(part);
    })
    .join('');

  return `${clientName}Api`;
}

export function removeObjectName(obj: any): any {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((k) => removeObjectName(k));
    }
    const copy = {};
    for (const prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
        continue;
      }
      if (prop === '$objectName') {
        continue;
      }
      copy[prop] = removeObjectName(obj[prop]);
    }
    return copy;
  }
  return obj;
}

export function checkIfLanguageExists(language: string): boolean {
  return Boolean(ctsConfig[language]);
}

export function removeEnumType(obj: any): any {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((k) => removeEnumType(k));
    }
    if ('$enumType' in obj) {
      return obj.value;
    }
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, removeEnumType(v)])
    );
  }
  return obj;
}

function printUsage(commandName: string): void {
  /* eslint-disable no-console */
  console.log(`usage: ${commandName} language client`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export function parseCLI(
  args: string[],
  commandName: string
): { lang: string; client: string } {
  if (args.length < 3) {
    console.log('not enough arguments');
    printUsage(commandName);
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
  /* eslint-enable no-console */

  return {
    lang,
    client,
  };
}

export async function createOutputDir({
  language,
  testPath,
}: {
  language: string;
  testPath: string;
}): Promise<void> {
  await fsp.mkdir(
    `output/${language}/${ctsConfig[language].outputFolder}/${testPath}`,
    {
      recursive: true,
    }
  );
}

export function getOutputPath({
  language,
  client,
  testPath,
}: {
  language: string;
  client: string;
  testPath: string;
}): string {
  return `output/${language}/${ctsConfig[language].outputFolder}/${testPath}/${client}.${ctsConfig[language].extension}`;
}

export async function loadTemplates({
  language,
  testPath,
}: {
  language: string;
  testPath: string;
}): Promise<Record<string, string>> {
  const templates: Record<string, string> = {};
  const templatePath = `./CTS/${testPath}/templates/${language}`;

  if (!(await exists(templatePath))) {
    return {};
  }

  for await (const file of walk(templatePath)) {
    if (!file.name.endsWith('.mustache')) {
      continue;
    }
    const name = file.name.replace('.mustache', '');
    const fileContent = (await fsp.readFile(file.path)).toString();
    templates[name] = fileContent;
  }
  return templates;
}
