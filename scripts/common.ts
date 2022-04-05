import fsp from 'fs/promises';
import path from 'path';

import execa from 'execa'; // https://github.com/sindresorhus/execa/tree/v5.1.1
import { hashElement } from 'folder-hash';
import { remove } from 'fs-extra';

import clientsConfig from '../config/clients.config.json';
import openapitools from '../openapitools.json';

import { createSpinner } from './oraLog';
import type {
  CheckForCache,
  CheckForCacheOptions,
  Generator,
  RunOptions,
} from './types';

export const CI = Boolean(process.env.CI);
export const DOCKER = Boolean(process.env.DOCKER);

// This script is run by `yarn workspace ...`, which means the current working directory is `./script`
export const ROOT_DIR = path.resolve(process.cwd(), '..');

export const ROOT_ENV_PATH = path.resolve(ROOT_DIR, '.env');

export const GENERATORS: Record<string, Generator> = {
  // Default `algoliasearch` package as it's built similarly to generated clients
  'javascript-algoliasearch': {
    language: 'javascript',
    client: 'algoliasearch',
    key: 'javascript-algoliasearch',
    additionalProperties: {
      packageName: '@experimental-api-clients-automation/algoliasearch',
      packageVersion:
        openapitools['generator-cli'].generators[
          clientsConfig.javascript.mainPackage
        ].additionalProperties.packageVersion,
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

export function getPackageVersion(generator: string): string {
  return GENERATORS[generator].additionalProperties.packageVersion;
}

export const LANGUAGES = [
  ...new Set(Object.values(GENERATORS).map((gen) => gen.language)),
];

export const CLIENTS_JS_UTILS = [
  'client-common',
  'requester-browser-xhr',
  'requester-node-http',
];

export const CLIENTS_JS = [
  ...new Set(Object.values(GENERATORS).map((gen) => gen.client)),
];

export const CLIENTS = CLIENTS_JS.filter(
  (client) => client !== 'algoliasearch'
);

/**
 * Takes a generator key in the form 'language-client' and returns the Generator object.
 */
export function splitGeneratorKey(
  generatorKey: string
): Pick<Generator, 'client' | 'key' | 'language'> {
  const language = generatorKey.slice(0, generatorKey.indexOf('-'));
  const client = generatorKey.slice(generatorKey.indexOf('-') + 1);
  return { language, client, key: generatorKey };
}

type GitHubUrl = (
  lang: string,
  options?: {
    token?: string;
  }
) => string;

export const getGitHubUrl: GitHubUrl = (
  lang: string,
  { token } = {}
): string => {
  const entry = Object.entries(openapitools['generator-cli'].generators).find(
    (_entry) => _entry[0].startsWith(`${lang}-`)
  );

  if (!entry) {
    throw new Error(`\`${lang}\` is not found from \`openapitools.json\`.`);
  }
  const { gitHost, gitRepoId } = entry[1];

  // GitHub Action provides a default token for authentication
  // https://docs.github.com/en/actions/security-guides/automatic-token-authentication
  // But it has access to only the self repository.
  // If we want to do something like pushing commits to other repositories,
  // we need to specify a token with more access.
  return token
    ? `https://${token}:${token}@github.com/${gitHost}/${gitRepoId}`
    : `https://github.com/${gitHost}/${gitRepoId}`;
};

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
        (
          await execa.command(command, {
            stdout: 'inherit',
            stderr: 'inherit',
            stdin: 'inherit',
            all: true,
            shell: 'bash',
            cwd,
          })
        ).all ?? ''
      );
    }
    return (
      (await execa.command(command, { shell: 'bash', all: true, cwd })).all ??
      ''
    );
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

export async function gitCommit({
  message,
  coauthor,
  cwd = ROOT_DIR,
}: {
  message: string;
  coauthor?: {
    name: string;
    email: string;
  };
  cwd?: string;
}): Promise<void> {
  await execa(
    'git',
    [
      'commit',
      '-m',
      message +
        (coauthor
          ? `\n\n\nCo-authored-by: ${coauthor.name} <${coauthor.email}>`
          : ''),
    ],
    {
      cwd,
    }
  );
}

export async function checkForCache(
  {
    job,
    folder,
    generatedFiles,
    filesToCache,
    cacheFile,
  }: CheckForCacheOptions,
  verbose: boolean
): Promise<CheckForCache> {
  const spinner = createSpinner(`checking cache for ${job}`, verbose).start();
  const cache: CheckForCache = {
    cacheExists: false,
    hash: '',
  };
  const generatedFilesExists = (
    await Promise.all(
      generatedFiles.map((generatedFile) =>
        exists(`${folder}/${generatedFile}`)
      )
    )
  ).every((exist) => exist);

  for (const fileToCache of filesToCache) {
    const fileHash = (await hashElement(`${folder}/${fileToCache}`)).hash;

    cache.hash = `${cache.hash}-${fileHash}`;
  }

  // We only skip if both the cache and the generated file exists
  if (generatedFilesExists && (await exists(cacheFile))) {
    const storedHash = (await fsp.readFile(cacheFile)).toString();
    if (storedHash === cache.hash) {
      spinner.succeed(`job skipped, cache found for ${job}`);
      return {
        cacheExists: true,
        hash: cache.hash,
      };
    }
  }

  spinner.info(`cache not found for ${job}`);

  return cache;
}

export async function buildCustomGenerators(verbose: boolean): Promise<void> {
  const cacheFile = toAbsolutePath('generators/.cache');
  const { cacheExists, hash } = await checkForCache(
    {
      job: 'custom generators',
      folder: toAbsolutePath('generators/'),
      generatedFiles: ['build'],
      filesToCache: ['src', 'build.gradle', 'settings.gradle'],
      cacheFile,
    },
    verbose
  );

  if (cacheExists) {
    return;
  }

  const spinner = createSpinner('building custom generators', verbose).start();

  await run('./gradle/gradlew --no-daemon -p generators assemble', {
    verbose,
  });

  if (hash) {
    spinner.text = 'storing custom generators cache';
    await fsp.writeFile(cacheFile, hash);
  }

  spinner.succeed();
}

export async function gitBranchExists(branchName: string): Promise<boolean> {
  return Boolean(await run(`git ls-remote --heads origin ${branchName}`));
}

export async function emptyDirExceptForDotGit(dir: string): Promise<void> {
  for (const file of await fsp.readdir(dir)) {
    if (file !== '.git') {
      await remove(path.resolve(dir, file));
    }
  }
}
