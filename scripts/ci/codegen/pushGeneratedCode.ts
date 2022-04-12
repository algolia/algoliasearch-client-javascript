/* eslint-disable no-console */
import { MAIN_BRANCH, run } from '../../common';
import { configureGitHubAuthor } from '../../release/common';
import { getNbGitDiff } from '../utils';

const PR_NUMBER = parseInt(process.env.PR_NUMBER || '0', 10);
const FOLDERS_TO_CHECK = 'yarn.lock openapitools.json clients specs/bundled';

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

  const commitMessage =
    await run(`git show -s ${baseBranch} --format="chore: generated code for commit %H. ${
      isMainBranch ? '[skip ci]' : ''
    }

Co-authored-by: %an <%ae>"`);

  console.log(
    `Pushing code for folders '${FOLDERS_TO_CHECK}' to generated branch: '${branchToPush}'`
  );
  await run(`git add ${FOLDERS_TO_CHECK}`);
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
