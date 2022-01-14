import fsp from 'fs/promises';
import path from 'path';

import openapitools from '../../openapitools.json';

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

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createClientName(client: string): string {
  return `${client
    .split('-')
    .map((part) => capitalize(part))
    .join('')}Api`;
}

export function removeObjectName(obj: Record<string, any>): void {
  for (const prop in obj) {
    if (prop === '$objectName') {
      // eslint-disable-next-line no-param-reassign
      delete obj[prop];
    } else if (typeof obj[prop] === 'object') {
      removeObjectName(obj[prop]);
    }
  }
}

export const extensionForLanguage: Record<string, string> = {
  javascript: 'test.ts',
  java: 'java',
};
