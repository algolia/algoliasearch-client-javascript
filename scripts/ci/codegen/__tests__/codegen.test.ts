import { cleanGeneratedBranch } from '../cleanGeneratedBranch';
import { pushGeneratedCode } from '../pushGeneratedCode';
import commentText, { GENERATED_MAIN_BRANCH } from '../text';
import {
  getCommentBody,
  upsertGenerationComment,
} from '../upsertGenerationComment';

describe('codegen', () => {
  describe('cleanGeneratedBranch', () => {
    it('throws without parameters', async () => {
      await expect(
        // @ts-expect-error a parameter is required
        cleanGeneratedBranch()
      ).rejects.toThrow(
        'The base branch should be passed as a cli parameter of the `cleanGeneratedBranch` script.'
      );
    });
  });

  describe('pushGeneratedCode', () => {
    it('throws without GITHUB_TOKEN environment variable', async () => {
      await expect(pushGeneratedCode()).rejects.toThrow(
        'Environment variable `GITHUB_TOKEN` does not exist.'
      );
    });
  });

  describe('upsertGenerationComment', () => {
    it('throws without parameter', async () => {
      await expect(
        // @ts-expect-error a parameter is required
        upsertGenerationComment()
      ).rejects.toThrow(
        '`upsertGenerationComment` requires a `trigger` parameter (`codegen` | `notification`).'
      );
    });

    it('throws without PR_NUMBER environment variable', async () => {
      process.env.GITHUB_TOKEN = 'foo';

      await expect(upsertGenerationComment('codegen')).rejects.toThrow(
        '`upsertGenerationComment` requires a `PR_NUMBER` environment variable.'
      );
    });
  });

  describe('getCommentBody', () => {
    it('returns the right comment for a `notification` trigger', async () => {
      expect(await getCommentBody('notification')).toMatchInlineSnapshot(`
        "### 🔨 The codegen job will run at the end of the CI.

        _Make sure your last commit does not contains generated code, it will be automatically pushed by our CI._"
      `);
    });

    it('returns the right comment for a `noGen` trigger', async () => {
      expect(await getCommentBody('noGen')).toMatchInlineSnapshot(`
        "### ✗ No code generated.

        _If you believe this is an issue on our side, please [open an issue](https://github.com/algolia/api-clients-automation/issues/new?template=Bug_report.md)._"
      `);
    });

    it('returns the right comment for a `cleanup` trigger', async () => {
      expect(await getCommentBody('cleanup')).toMatchInlineSnapshot(`
        "### ✗ The generated branch has been deleted.

        If the PR has been merged, you can check the generated code on the [\`${GENERATED_MAIN_BRANCH}\` branch](https://github.com/algolia/api-clients-automation/tree/${GENERATED_MAIN_BRANCH})."
      `);
    });

    describe('text', () => {
      it('creates a comment body for the parameters', () => {
        expect(
          commentText.codegen.body(
            'myBranch',
            'myCommit',
            42,
            'theGeneratedCommit'
          )
        ).toMatchInlineSnapshot(`
          "
          |  Name | Link |
          |---------------------------------|------------------------|
          | 🔨 Triggered by | [\`myCommit\`](https://github.com/algolia/api-clients-automation/pull/42/commits/myCommit) |
          | 🔍 Generated code | [\`theGeneratedCommit\`](https://github.com/algolia/api-clients-automation/commit/theGeneratedCommit) |
          | 🌲 Generated branch | [\`myBranch\`](https://github.com/algolia/api-clients-automation/tree/myBranch) |
          "
        `);
      });
    });
  });
});
