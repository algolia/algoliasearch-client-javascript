/* eslint-disable no-console */
import { run } from '../../common';

/**
 * Deletes a branch for its `generated/${headRef}` name on origin.
 */
async function cleanGeneratedBranch(headRef: string): Promise<void> {
  const generatedCodeBranch = `generated/${headRef}`;

  if (!(await run(`git ls-remote --heads origin ${generatedCodeBranch}`))) {
    console.log(`No branch named '${generatedCodeBranch}' was found.`);

    return;
  }

  // Delete previous generations to avoid conflicts and out of date code
  console.log(`Deleting generated branch: '${generatedCodeBranch}'`);

  await run(`git fetch origin ${generatedCodeBranch}`);
  await run(`git push -d origin ${generatedCodeBranch}`);
}

const args = process.argv.slice(2);

if (!args || args.length === 0) {
  throw new Error(
    'The base branch should be passed as a cli parameter of the `cleanGeneratedBranch` script.'
  );
}

cleanGeneratedBranch(args[0]);
