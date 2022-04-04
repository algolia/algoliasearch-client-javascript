import { CLIENTS, GENERATORS, run } from '../common';
import type { Language } from '../types';

type CreateMatrix = {
  baseChanged: boolean;
  baseBranch: string;
  language?: Language;
};

type ClientMatrix = {
  name: string;
  folder: string;
  config?: string;
  api?: string;
};

type Matrix<TMatrix> = {
  client: TMatrix[];
};

// This empty matrix is required by the CI, otherwise it throws
const EMPTY_MATRIX = JSON.stringify({ client: ['no-run'] });

/**
 * Returns the number of diff between a `branch` and the current HEAD for the given `path`.
 */
async function getNbGitDiff(branch: string, path: string): Promise<number> {
  return parseInt(
    (
      await run(`git diff --shortstat ${branch}..HEAD -- ${path} | wc -l`)
    ).trim(),
    10
  );
}

async function getClientMatrix({
  language,
  baseBranch,
  baseChanged,
}: CreateMatrix): Promise<Matrix<ClientMatrix>> {
  const matrix: Matrix<ClientMatrix> = { client: [] };

  for (const {
    client,
    output,
    additionalProperties,
    ...options
  } of Object.values(GENERATORS)) {
    if (
      options.language !== language ||
      // `algoliasearch` is an aggregation of clients
      client === 'algoliasearch'
    ) {
      continue;
    }

    const specChanges = await getNbGitDiff(baseBranch, `specs/${client}`);
    const clientChanges = await getNbGitDiff(baseBranch, output);

    if (clientChanges === 0 && specChanges === 0 && !baseChanged) {
      continue;
    }

    const matchedGenerator: ClientMatrix = {
      name: client,
      folder: output,
    };

    // Extra informations for the PHP matrix in order to properly scope the
    // GitHub action cache
    if (language === 'php') {
      matchedGenerator.config = additionalProperties.configClassname;
      matchedGenerator.api = additionalProperties.configClassname.replace(
        'Config',
        'Api'
      );
    }

    matrix.client.push(matchedGenerator);
  }

  return matrix;
}

async function getSpecMatrix({
  baseBranch,
  baseChanged,
}: CreateMatrix): Promise<Matrix<string>> {
  const matrix: Matrix<string> = { client: [] };

  for (const client of CLIENTS) {
    const specChanges = await getNbGitDiff(baseBranch, `specs/${client}`);

    if (specChanges === 0 && !baseChanged) {
      continue;
    }

    matrix.client.push(client);
  }

  return matrix;
}

async function createMatrix(opts: CreateMatrix): Promise<void> {
  const matrix = opts.language
    ? await getClientMatrix(opts)
    : await getSpecMatrix(opts);

  // eslint-disable-next-line no-console
  console.log(
    matrix.client.length === 0 ? EMPTY_MATRIX : JSON.stringify(matrix)
  );
}

if (require.main === module) {
  const args = process.argv.slice(2);

  createMatrix({
    baseChanged: args[0] === 'true',
    baseBranch: args[1],
    language: args[2] as Language,
  });
}
