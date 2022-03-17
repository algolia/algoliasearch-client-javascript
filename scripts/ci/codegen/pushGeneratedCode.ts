/* eslint-disable no-console */
import { run } from '../../common';
import { configureGitHubAuthor } from '../../release/common';

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

  // determine generated branch name based on current branch
  const generatedCodeBranch = `generated/${baseBranch}`;

  if (
    (await run(
      `git status --porcelain ${FOLDERS_TO_CHECK} | wc -l | tr -d ' '`
    )) === '0'
  ) {
    console.log(`No generated code changes found for '${baseBranch}'.`);

    if (PR_NUMBER) {
      await run(`yarn workspace scripts upsertGenerationComment noGen`);
    }

    return;
  }

  await run(`yarn workspace scripts cleanGeneratedBranch ${baseBranch}`);

  console.log(`Creating branch for generated code: '${generatedCodeBranch}'`);
  await run(`git branch ${generatedCodeBranch}`);
  const commitMessage =
    await run(`git show -s --format="Generated code for commit %H.

Co-authored-by: %an <%ae>"`);

  console.log(
    `Pushing code for folders '${FOLDERS_TO_CHECK}' to generated branch: ${generatedCodeBranch}`
  );
  await run(`git checkout ${generatedCodeBranch}`);
  await run(`git add ${FOLDERS_TO_CHECK}`);
  await run(`git commit -m "${commitMessage}"`);
  await run(`git push origin ${generatedCodeBranch}`);
  await run(`git checkout ${baseBranch}`);

  if (PR_NUMBER) {
    await run(`yarn workspace scripts upsertGenerationComment codegen`);
  }
}

if (require.main === module) {
  pushGeneratedCode();
}
