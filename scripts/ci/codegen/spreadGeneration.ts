/* eslint-disable no-console */
import { copy } from 'fs-extra';

import {
  emptyDirExceptForDotGit,
  gitCommit,
  LANGUAGES,
  run,
  toAbsolutePath,
  REPO_URL,
} from '../../common';
import { getLanguageFolder } from '../../config';
import { cloneRepository, configureGitHubAuthor } from '../../release/common';
import { getNbGitDiff } from '../utils';

import text from './text';

export function decideWhereToSpread(commitMessage: string): string[] {
  if (commitMessage.startsWith('chore: release')) {
    return [];
  }

  const result = commitMessage.match(/(.+)\((.+)\):/);
  if (!result) {
    // no scope
    return LANGUAGES;
  }

  const scope = result[2];
  return LANGUAGES.includes(scope) ? [scope] : LANGUAGES;
}

export function cleanUpCommitMessage(commitMessage: string): string {
  const isCodeGenCommit = commitMessage.startsWith(text.commitStartMessage);

  if (isCodeGenCommit) {
    const hash = commitMessage
      .split(text.commitStartMessage)[1]
      .replace('. [skip ci]', '')
      .trim();

    if (!hash) {
      return commitMessage;
    }

    return [
      `${text.commitStartMessage} ${hash.substring(0, 8)}. [skip ci]`,
      `${REPO_URL}/commit/${hash}`,
    ].join('\n\n');
  }

  const prCommit = commitMessage.match(/(.+)\s\(#(\d+)\)$/);

  if (!prCommit) {
    return commitMessage;
  }

  return [prCommit[1], `${REPO_URL}/pull/${prCommit[2]}`].join('\n\n');
}

async function spreadGeneration(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
  }

  const lastCommitMessage = await run('git log -1 --format="%s"');
  const author = (
    await run('git log -1 --format="Co-authored-by: %an <%ae>"')
  ).trim();
  const coAuthors = (
    await run('git log -1 --format="%(trailers:key=Co-authored-by)"')
  )
    .split('\n')
    .map((coAuthor) => coAuthor.trim())
    .filter(Boolean);

  const commitMessage = cleanUpCommitMessage(lastCommitMessage);
  const langs = decideWhereToSpread(lastCommitMessage);

  for (const lang of langs) {
    const { tempGitDir } = await cloneRepository({
      lang,
      githubToken: process.env.GITHUB_TOKEN,
      tempDir: process.env.RUNNER_TEMP!,
    });

    const clientPath = toAbsolutePath(getLanguageFolder(lang));
    await emptyDirExceptForDotGit(tempGitDir);
    await copy(clientPath, tempGitDir, { preserveTimestamps: true });

    if (
      (await getNbGitDiff({
        head: null,
        cwd: tempGitDir,
      })) === 0
    ) {
      console.log(
        `❎ Skipping ${lang} repository, because there is no change.`
      );
      continue;
    }

    await configureGitHubAuthor(tempGitDir);
    await run(`git add .`, { cwd: tempGitDir });
    await gitCommit({
      message: commitMessage,
      coAuthors: [author, ...coAuthors],
      cwd: tempGitDir,
    });
    await run(`git push`, { cwd: tempGitDir });
    console.log(`✅ Spread the generation to ${lang} repository.`);
  }
}

if (require.main === module) {
  spreadGeneration();
}
