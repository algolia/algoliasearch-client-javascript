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

// All those language dependents object should be defined in the CTS itself
export const extensionForLanguage: Record<string, string> = {
  javascript: 'test.ts',
  java: 'test.java',
};

export const sourcePathForLanguage: Record<string, string> = {
  javascript: 'tests/methods/requests',
  java: 'src/test/java/com/algolia',
};
