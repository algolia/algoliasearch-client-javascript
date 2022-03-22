import {
  parseCommit,
  getVersionChangesText,
  decideReleaseStrategy,
} from '../create-release-issue';

describe('create release issue', () => {
  it('parses commit', () => {
    expect(parseCommit(`abcdefg fix(javascript): fix the thing`)).toEqual({
      hash: 'abcdefg',
      lang: 'javascript',
      message: 'fix the thing',
      raw: 'abcdefg fix(javascript): fix the thing',
      type: 'fix',
    });
  });

  it('returns error when language scope is missing', () => {
    expect(parseCommit(`abcdefg fix: fix the thing`)).toEqual({
      error: 'missing-language-scope',
    });
  });

  it('returns error when language scope is unknown', () => {
    expect(parseCommit(`abcdefg fix(basic): fix the thing`)).toEqual({
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
          hash: 'abcdefg',
          type: 'feat',
          lang: 'javascript',
          message: 'update the API (BREAKING CHANGE)',
          raw: 'abcdefg feat(javascript): update the API (BREAKING CHANGE)',
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
          hash: 'abcdefg',
          type: 'feat',
          lang: 'php',
          message: 'update the API',
          raw: 'abcdefg feat(php): update the API',
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
          hash: 'abcdefg',
          type: 'fix',
          lang: 'java',
          message: 'fix some bug',
          raw: 'abcdefg fix(java): fix some bug',
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
          hash: 'abcdefg',
          type: 'fix',
          lang: 'java',
          message: 'fix some bug',
          raw: 'abcdefg fix(java): fix some bug',
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
          hash: 'abcdefg',
          type: 'chore',
          lang: 'javascript',
          message: 'update devDevpendencies',
          raw: 'abcdefg chore(javascript): update devDevpendencies',
        },
      ],
    });
    expect(versions.javascript.skipRelease).toEqual(true);
    expect(versions.java.skipRelease).toBeUndefined();
    expect(versions.php.skipRelease).toBeUndefined();
  });
});
