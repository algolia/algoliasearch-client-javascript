/* eslint-disable no-console */
import { Octokit } from '@octokit/rest';

import { run } from '../../common';
import { configureGitHubAuthor, OWNER, REPO } from '../../release/common';

if (!process.env.GITHUB_TOKEN) {
  throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
}

const PR_NUMBER = parseInt(process.env.PR_NUMBER || '0', 10);
const FOLDERS_TO_CHECK = ['clients', 'specs/bundled'];
// this should be changed to the bot name once we have the logs
const BOT_NAME = 'shortcuts';

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
});

async function getCommentBody(commit: string, branch: string): Promise<string> {
  const repoUrl = `https://github.com/${OWNER}/${REPO}`;
  const generatedCommit = await run('git show -s --format=%H');
  const header = `✔️ codegen triggered on commit [${commit}](${repoUrl}/pull/${PR_NUMBER}/commits/${commit}).`;
  const body = `🔍 Browse the generated code on branch [${branch}](${repoUrl}/tree/${branch}): [${generatedCommit}](${repoUrl}/commit/${generatedCommit}).`;

  return `${header}

${body}`;
}

/**
 * Add or update comment to the current `PR_NUMBER`.
 */
async function upsertCommentToPullRequest(
  baseCommit: string,
  generatedCodeBranch: string
): Promise<void> {
  const baseOctokitConfig = {
    owner: OWNER,
    repo: REPO,
    issue_number: PR_NUMBER,
  };

  try {
    // Search for a previous comment from our bot.
    const previousComment = await octokit.rest.issues
      .listComments(baseOctokitConfig)
      .then(
        (res) =>
          res.data.filter(
            (comment) =>
              comment.user?.login === BOT_NAME &&
              // this shouldn't be needed once we have a proper bot running
              comment.body?.startsWith('✔️ codegen triggered on commit')
          )[0]
      );
    const commentBody = await getCommentBody(baseCommit, generatedCodeBranch);

    if (previousComment?.id) {
      console.log(`Previous bot comment found ${previousComment.id}.`);

      await octokit.rest.issues.updateComment({
        ...baseOctokitConfig,
        body: commentBody,
        comment_id: previousComment.id,
      });

      return;
    }

    console.log('Creating new comment.');
    await octokit.rest.issues.createComment({
      ...baseOctokitConfig,
      body: commentBody,
    });
  } catch (e) {
    throw new Error(`Error with GitHub API: ${e}`);
  }
}

/**
 * Push generated code for the current `JOB` and `CLIENT` on a `generated/` branch.
 */
async function pushGeneratedCode(): Promise<void> {
  await configureGitHubAuthor();

  const baseBranch = await run('git branch --show-current');
  console.log(`Checking codegen status on '${baseBranch}'.`);

  // determine generated branch name based on current branch
  const generatedCodeBranch = `generated/${baseBranch}`;
  const generatedFolders = FOLDERS_TO_CHECK.join(' ');

  if (
    (await run(
      `git status --porcelain ${generatedFolders} | wc -l | tr -d ' '`
    )) === '0'
  ) {
    console.log(`No generated code changes found for '${baseBranch}'.`);

    return;
  }

  await run(`yarn workspace scripts cleanGeneratedBranch ${baseBranch}`);

  const baseCommit = await run(`git show ${baseBranch} -s --format=%H`);
  console.log(
    `Codegen triggered on branch '${baseBranch}' for commit ${baseCommit}.`
  );

  console.log(`Creating branch for generated code: '${generatedCodeBranch}'`);
  await run(`git branch ${generatedCodeBranch}`);
  const commitMessage =
    await run(`git show -s --format="Generated code for commit %H.

Co-authored-by: %an <%ae>"`);

  console.log(
    `Pushing code for folders '${generatedFolders}' to generated branch: ${generatedCodeBranch}`
  );
  await run(`git checkout ${generatedCodeBranch}`);
  await run(`git add ${generatedFolders}`);
  await run(`git commit -m "${commitMessage}"`);
  await run(`git push origin ${generatedCodeBranch}`);

  if (PR_NUMBER) {
    await upsertCommentToPullRequest(baseCommit, generatedCodeBranch);
  }
}

pushGeneratedCode();
