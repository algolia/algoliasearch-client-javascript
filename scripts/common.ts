import fsp from 'fs/promises';
import path from 'path';

import execa from 'execa'; // https://github.com/sindresorhus/execa/tree/v5.1.1

import openapitools from '../openapitools.json';

import type { Generator, RunOptions } from './types';

export const CI = Boolean(process.env.CI);
export const DOCKER = Boolean(process.env.DOCKER);

// This script is run by `yarn workspace ...`, which means the current working directory is `./script`
export const ROOT_DIR = path.resolve(process.cwd(), '..');

export const GENERATORS: Record<string, Generator> = {
  // Default `algoliasearch` package as it's built similarly to generated clients
  'javascript-algoliasearch': {
    language: 'javascript',
    client: 'algoliasearch',
    key: 'javascript-algoliasearch',
    additionalProperties: {
      packageName: '@experimental-api-clients-automation/algoliasearch',
      packageVersion: '0.0.4',
    },
  },
};

// Build `GENERATORS` from the openapitools file
Object.entries(openapitools['generator-cli'].generators).forEach(
  ([key, gen]) => {
    GENERATORS[key] = {
      ...gen,
      output: gen.output.replace('#{cwd}/', ''),
      ...splitGeneratorKey(key),
    };
  }
);

export const LANGUAGES = [
  ...new Set(Object.values(GENERATORS).map((gen) => gen.language)),
];

export const CLIENTS_JS_UTILS = [
  'client-common',
  'requester-browser-xhr',
  'requester-node-http',
];

export const CLIENTS_JS = [
  'algoliasearch',
  ...new Set(Object.values(GENERATORS).map((gen) => gen.client)),
];

export const CLIENTS = CLIENTS_JS.filter(
  (client) => client !== 'algoliasearch'
);

/**
 * Takes a generator key in the form 'language-client' and returns the Generator object.
 */
export function splitGeneratorKey(generatorKey: string): Generator {
  const language = generatorKey.slice(0, generatorKey.indexOf('-'));
  const client = generatorKey.slice(generatorKey.indexOf('-') + 1);
  return { language, client, key: generatorKey };
}

export function getGitHubUrl(lang: string): string {
  const entry = Object.entries(openapitools['generator-cli'].generators).find(
    (_entry) => _entry[0].startsWith(`${lang}-`)
  );

  if (!entry) {
    throw new Error(`\`${lang}\` is not found from \`openapitools.json\`.`);
  }
  const { gitHost, gitRepoId } = entry[1];
  return `https://github.com/${gitHost}/${gitRepoId}`;
}

export function createGeneratorKey({
  language,
  client,
}: Pick<Generator, 'client' | 'language'>): string {
  return `${language}-${client}`;
}

export async function run(
  command: string,
  { errorMessage, verbose, cwd = ROOT_DIR }: RunOptions = {}
): Promise<string> {
  try {
    if (verbose) {
      return (
        await execa.command(command, {
          stdout: 'inherit',
          shell: 'bash',
          cwd,
        })
      ).stdout;
    }
    return (await execa.command(command, { shell: 'bash', cwd })).stdout;
  } catch (err) {
    if (errorMessage) {
      throw new Error(`[ERROR] ${errorMessage}`);
    } else {
      throw err;
    }
  }
}

export async function exists(ppath: string): Promise<boolean> {
  try {
    await fsp.stat(ppath);
    return true;
  } catch {
    return false;
  }
}

export function toAbsolutePath(ppath: string): string {
  return path.resolve(ROOT_DIR, ppath);
}

export async function runIfExists(
  scriptFile: string,
  args: string,
  opts: RunOptions = {}
): Promise<string> {
  if (await exists(toAbsolutePath(scriptFile))) {
    return await run(`${scriptFile} ${args}`, opts);
  }
  return '';
}
