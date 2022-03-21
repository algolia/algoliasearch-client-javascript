import { LANGUAGES } from '../../../common';
import { decideWhereToSpread, cleanUpCommitMessage } from '../spreadGeneration';

describe('spread generation', () => {
  it('skips in case of release commit', () => {
    expect(decideWhereToSpread('chore: release 2022-03-15')).toEqual([]);
  });

  it('spreads to all if scope is missing', () => {
    expect(decideWhereToSpread('chore: do something')).toEqual(LANGUAGES);
  });

  it('spreads to javascript if the scope is javascript', () => {
    expect(decideWhereToSpread('fix(javascript): fix something')).toEqual([
      'javascript',
    ]);
  });

  it('spreads to all if scope is not specific language', () => {
    ['cts', 'spec', 'script', 'ci'].forEach((scope) => {
      expect(decideWhereToSpread(`fix(${scope}): fix something`)).toEqual(
        LANGUAGES
      );
    });
  });

  it('removes pull-request number from commit message', () => {
    expect(
      cleanUpCommitMessage(`feat(ci): make ci push generated code (#244)`)
    ).toEqual(
      `feat(ci): make ci push generated code\n\nhttps://github.com/algolia/api-clients-automation/pull/244`
    );
  });

  it('keeps the commit message even if it does not have PR number', () => {
    const commitMessage = `feat(ci): make ci push generated code`;
    expect(cleanUpCommitMessage(commitMessage)).toEqual(commitMessage);
  });

  it('cleans up correctly even if the title contains a url', () => {
    const commitMessage = `fix(java): solve oneOf using a custom generator https://algolia.atlassian.net/browse/APIC-123 (#200)`;
    expect(cleanUpCommitMessage(commitMessage)).toMatchInlineSnapshot(`
      "fix(java): solve oneOf using a custom generator https://algolia.atlassian.net/browse/APIC-123

      https://github.com/algolia/api-clients-automation/pull/200"
    `);
  });
});
