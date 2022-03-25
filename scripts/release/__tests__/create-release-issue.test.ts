import {
  parseCommit,
  getVersionChangesText,
  decideReleaseStrategy,
  readVersions,
} from '../create-release-issue';

describe('create release issue', () => {
  it('reads versions openapitools.json', () => {
    expect(readVersions()).toEqual({
      java: {
        current: expect.any(String),
      },
      javascript: { current: expect.any(String) },
      php: { current: expect.any(String) },
    });
  });

  it('parses commit', () => {
    expect(parseCommit(`b2501882 fix(javascript): fix the thing`)).toEqual({
      hash: 'b2501882',
      lang: 'javascript',
      message: 'fix the thing',
      raw: 'b2501882 fix(javascript): fix the thing',
      type: 'fix',
    });
  });

  it('returns error when language scope is missing', () => {
    expect(parseCommit(`b2501882 fix: fix the thing`)).toEqual({
      error: 'missing-language-scope',
    });
  });

  it('returns error when language scope is unknown', () => {
    expect(parseCommit(`b2501882 fix(basic): fix the thing`)).toEqual({
      error: 'unknown-language-scope',
    });
  });

  it('generates text for version changes', () => {
    expect(
      getVersionChangesText({
        javascript: {
          current: '0.0.1',
          releaseType: 'patch',
        },
        php: {
          current: '0.0.1',
          releaseType: 'patch',
        },
        java: {
          current: '0.0.1',
          releaseType: 'patch',
        },
      })
    ).toMatchInlineSnapshot(`
      "- [x] javascript: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
      - [x] java: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
      - [x] php: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_"
    `);
  });

  it('generates text for version changes with a language with no commit', () => {
    expect(
      getVersionChangesText({
        javascript: {
          current: '0.0.1',
          releaseType: 'patch',
        },
        php: {
          current: '0.0.1',
          releaseType: null,
          noCommit: true,
        },
        java: {
          current: '0.0.1',
          releaseType: 'patch',
        },
      })
    ).toMatchInlineSnapshot(`
      "- [x] javascript: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
      - [x] java: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
      - ~php: v0.0.1 (no commit)~"
    `);
  });

  it('generates text for version changes with a language to skip', () => {
    expect(
      getVersionChangesText({
        javascript: {
          current: '0.0.1',
          releaseType: 'patch',
        },
        php: {
          current: '0.0.1',
          releaseType: 'minor',
        },
        java: {
          current: '0.0.1',
          releaseType: 'patch',
          skipRelease: true,
        },
      })
    ).toMatchInlineSnapshot(`
      "- [x] javascript: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
      - [ ] java: v0.0.1 -> \`patch\` _(e.g. v0.0.2)_
        - No \`feat\` or \`fix\` commit, thus unchecked by default.
      - [x] php: v0.0.1 -> \`minor\` _(e.g. v0.1.0)_"
    `);
  });

  it('bumps major version for BREAKING CHANGE', () => {
    const versions = decideReleaseStrategy({
      versions: {
        javascript: {
          current: '0.0.1',
        },
        java: {
          current: '0.0.1',
        },
        php: {
          current: '0.0.1',
        },
      },
      commits: [
        {
          hash: 'b2501882',
          type: 'feat',
          lang: 'javascript',
          message: 'update the API (BREAKING CHANGE)',
          raw: 'b2501882 feat(javascript): update the API (BREAKING CHANGE)',
        },
      ],
    });

    expect(versions.javascript.releaseType).toEqual('major');
  });

  it('bumps minor version for feat', () => {
    const versions = decideReleaseStrategy({
      versions: {
        javascript: {
          current: '0.0.1',
        },
        java: {
          current: '0.0.1',
        },
        php: {
          current: '0.0.1',
        },
      },
      commits: [
        {
          hash: 'b2501882',
          type: 'feat',
          lang: 'php',
          message: 'update the API',
          raw: 'b2501882 feat(php): update the API',
        },
      ],
    });

    expect(versions.php.releaseType).toEqual('minor');
  });

  it('bumps patch version for fix', () => {
    const versions = decideReleaseStrategy({
      versions: {
        javascript: {
          current: '0.0.1',
        },
        java: {
          current: '0.0.1',
        },
        php: {
          current: '0.0.1',
        },
      },
      commits: [
        {
          hash: 'b2501882',
          type: 'fix',
          lang: 'java',
          message: 'fix some bug',
          raw: 'b2501882 fix(java): fix some bug',
        },
      ],
    });

    expect(versions.java.releaseType).toEqual('patch');
  });

  it('marks noCommit for languages without any commit', () => {
    const versions = decideReleaseStrategy({
      versions: {
        javascript: {
          current: '0.0.1',
        },
        java: {
          current: '0.0.1',
        },
        php: {
          current: '0.0.1',
        },
      },
      commits: [
        {
          hash: 'b2501882',
          type: 'fix',
          lang: 'java',
          message: 'fix some bug',
          raw: 'b2501882 fix(java): fix some bug',
        },
      ],
    });

    expect(versions.javascript.noCommit).toEqual(true);
    expect(versions.php.noCommit).toEqual(true);
    expect(versions.java.noCommit).toBeUndefined();
  });

  it('marks skipRelease for patch upgrade without fix commit', () => {
    const versions = decideReleaseStrategy({
      versions: {
        javascript: {
          current: '0.0.1',
        },
        java: {
          current: '0.0.1',
        },
        php: {
          current: '0.0.1',
        },
      },
      commits: [
        {
          hash: 'b2501882',
          type: 'chore',
          lang: 'javascript',
          message: 'update devDevpendencies',
          raw: 'b2501882 chore(javascript): update devDevpendencies',
        },
      ],
    });
    expect(versions.javascript.skipRelease).toEqual(true);
    expect(versions.java.skipRelease).toBeUndefined();
    expect(versions.php.skipRelease).toBeUndefined();
  });
});
