import execa from 'execa'; // https://github.com/sindresorhus/execa/tree/v5.1.1

import openapitools from '../../openapitools.json';
import config from '../../release.config.json';

export const RELEASED_TAG = config.releasedTag;
export const MAIN_BRANCH = config.mainBranch;
export const OWNER = config.owner;
export const REPO = config.repo;

type Run = (
  command: string,
  options?: Partial<{
    errorMessage: string;
  }>
) => execa.ExecaReturnBase<string>['stdout'];

export const run: Run = (command, { errorMessage = undefined } = {}) => {
  let result: execa.ExecaSyncReturnValue<string>;
  try {
    result = execa.commandSync(command);
  } catch (err) {
    if (errorMessage) {
      throw new Error(`[ERROR] ${errorMessage}`);
    } else {
      throw err;
    }
  }
  return result.stdout;
};

export const LANGS = [
  ...new Set(
    Object.keys(openapitools['generator-cli'].generators).map(
      (key) => key.split('-')[0]
    )
  ),
];
