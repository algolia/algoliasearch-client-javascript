/* eslint-disable no-console */
import { Octokit } from '@octokit/rest';

import { run } from '../../common';
import { OWNER, REPO } from '../../release/common';

import commentText from './text';

// this should be changed to the bot name once we have the logs
const BOT_NAME = 'shortcuts';
const PR_NUMBER = parseInt(process.env.PR_NUMBER || '0', 10);
const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
});

const args = process.argv.slice(2);
const allowedTriggers = ['notification', 'codegen', 'noGen', 'cleanup'];

type Trigger = keyof typeof commentText;

export async function getCommentBody(trigger: Trigger): Promise<string> {
  if (
    trigger === 'notification' ||
    trigger === 'noGen' ||
    trigger === 'cleanup'
  ) {
    return `${commentText[trigger].header}

${commentText[trigger].body}`;
  }

  const baseBranch = await run('git branch --show-current');
  const baseCommit = await run(`git show ${baseBranch} -s --format=%H`);

  const generatedBranch = `generated/${baseBranch}`;
  const generatedCommit = await run(
    `git show ${generatedBranch} -s --format=%H`
  );

  return `${commentText.codegen.header}

${commentText.codegen.body(
  generatedBranch,
  baseCommit,
  PR_NUMBER,
  generatedCommit
)}`;
}

/**
 * Adds or updates a comment on a pull request.
 */
export async function upsertGenerationComment(trigger: Trigger): Promise<void> {
  if (!trigger || allowedTriggers.includes(trigger) === false) {
    throw new Error(
      '`upsertGenerationComment` requires a `trigger` parameter (`codegen` | `notification`).'
    );
  }

  if (!PR_NUMBER) {
    throw new Error(
      '`upsertGenerationComment` requires a `PR_NUMBER` environment variable.'
    );
  }

  console.log(`Upserting comment for trigger: ${trigger}`);

  try {
    const baseOctokitConfig = {
      owner: OWNER,
      repo: REPO,
      issue_number: PR_NUMBER,
      body: await getCommentBody(trigger),
    };

    // Search for a previous comment from our bot.
    const previousComment = await octokit.rest.issues
      .listComments(baseOctokitConfig)
      .then(
        (res) =>
          res.data.filter(
            (comment) =>
              comment.user?.login === BOT_NAME &&
              // this shouldn't be needed once we have a proper bot running
              (comment.body?.startsWith(commentText.codegen.header) ||
                comment.body?.startsWith(commentText.noGen.header) ||
                comment.body?.startsWith(commentText.notification.header))
          )[0]
      );

    if (previousComment?.id) {
      console.log(`Previous bot comment found ${previousComment.id}.`);

      await octokit.rest.issues.updateComment({
        ...baseOctokitConfig,
        comment_id: previousComment.id,
      });

      return;
    }

    console.log('Creating new comment.');
    await octokit.rest.issues.createComment(baseOctokitConfig);
  } catch (e) {
    throw new Error(`Error with GitHub API: ${e}`);
  }
}

if (require.main === module) {
  upsertGenerationComment(args[0] as Trigger);
}
