/* eslint-disable no-console */
import { MAIN_BRANCH, run } from '../../common';
import { configureGitHubAuthor } from '../../release/common';
import { getNbGitDiff } from '../utils';

import text from './text';

const PR_NUMBER = parseInt(process.env.PR_NUMBER || '0', 10);
const FOLDERS_TO_CHECK = 'yarn.lock openapitools.json clients specs/bundled';

async function isUpToDate(): Promise<boolean> {
  await run('git fetch origin');
  return (await run('git status')).includes('Your branch is up to date with');
}

/**
 * Push generated code for the current `JOB` and `CLIENT` on a `generated/` branch.
 */
export async function pushGeneratedCode(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
  }

  await configureGitHubAuthor();

  const baseBranch = await run('git branch --show-current');
  const isMainBranch = baseBranch === MAIN_BRANCH;
  console.log(`Checking codegen status on '${baseBranch}'.`);

  const nbDiff = await getNbGitDiff({
    branch: baseBranch,
    head: null,
    path: FOLDERS_TO_CHECK,
  });

  if (nbDiff === 0) {
    console.log(`No generated code changes found for '${baseBranch}'.`);

    if (PR_NUMBER) {
      await run(`yarn workspace scripts upsertGenerationComment noGen`);
    }

    return;
  }

  console.log(`${nbDiff} changes found for ${FOLDERS_TO_CHECK}`);

  // determine generated branch name based on current branch
  const branchToPush = isMainBranch ? baseBranch : `generated/${baseBranch}`;

  if (!isMainBranch) {
    await run(`yarn workspace scripts cleanGeneratedBranch ${baseBranch}`);

    console.log(`Creating branch for generated code: '${branchToPush}'`);
    await run(`git checkout -b ${branchToPush}`);
  }

  if (!(await isUpToDate())) {
    console.log(
      `The branch ${branchToPush} is not up to date with ${baseBranch}, stopping this task and letting the new job push generated code.`
    );
    return;
  }

  const commitMessage = await run(`git show -s ${baseBranch} --format="${
    text.commitStartMessage
  } %H. ${isMainBranch ? '[skip ci]' : ''}

Co-authored-by: %an <%ae>
%(trailers:key=Co-authored-by)"`);

  console.log(
    `Pushing code for folders '${FOLDERS_TO_CHECK}' to generated branch: '${branchToPush}'`
  );
  await run(`git add ${FOLDERS_TO_CHECK}`);
  await run('git add `git ls-files --deleted`');
  await run(`git commit -m "${commitMessage}"`);
  await run(`git push origin ${branchToPush}`);

  if (PR_NUMBER) {
    await run(`git checkout ${baseBranch}`);
    await run(`yarn workspace scripts upsertGenerationComment codegen`);
  }
}

if (require.main === module) {
  pushGeneratedCode();
}
