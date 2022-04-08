/* eslint-disable no-console */
import { run, GENERATED_MAIN_BRANCH } from '../../common';
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
  const generatedCodeBranch = `generated/${baseBranch}`;

  // We don't re-create GENERATED_MAIN_BRANCH
  if (baseBranch !== 'main') {
    await run(`yarn workspace scripts cleanGeneratedBranch ${baseBranch}`);

    console.log(`Creating branch for generated code: '${generatedCodeBranch}'`);
    await run(
      `git branch ${generatedCodeBranch} origin/${GENERATED_MAIN_BRANCH}`
    );
  }

  await run(`git checkout ${generatedCodeBranch}`);

  // For the GENERATED_MAIN_BRANCH, we take the latest commit on main and generate code
  if (baseBranch === 'main') {
    console.log(`Merging '${baseBranch}' in '${generatedCodeBranch}'`);
    await run(`git merge --no-commit ${baseBranch}`);
  }

  const commitMessage =
    await run(`git show -s ${baseBranch} --format="Generated code for commit %H.

Co-authored-by: %an <%ae>"`);

  console.log(
    `Pushing code for folders '${FOLDERS_TO_CHECK}' to generated branch: '${generatedCodeBranch}'`
  );
  await run(`git add ${FOLDERS_TO_CHECK}`);
  await run(`git commit -m "${commitMessage}"`);
  await run(`git push origin ${generatedCodeBranch}`);

  if (PR_NUMBER) {
    await run(`git checkout ${baseBranch}`);
    await run(`yarn workspace scripts upsertGenerationComment codegen`);
  }
}

if (require.main === module) {
  pushGeneratedCode();
}
