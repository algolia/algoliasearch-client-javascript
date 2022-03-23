import { getVersionChangesText } from '../create-release-issue';
import { getVersionsToRelease } from '../process-release';
import TEXT from '../text';

describe('process release', () => {
  it('gets versions to release', () => {
    const versions = getVersionsToRelease(`
    ## Version Changes
    
    - [x] javascript: v1.0.0 -> \`minor\` (e.g. v1.1.0)
    - [x] php: v2.0.0 -> \`patch\` (e.g. v2.0.1)
    - [ ] java: v3.0.0 -> \`patch\` (e.g. v3.0.1)
    `);

    expect(Object.keys(versions)).toEqual(['javascript', 'php']);
    expect(versions.javascript.current).toEqual('1.0.0');
    expect(versions.javascript.releaseType).toEqual('minor');
    expect(versions.php.current).toEqual('2.0.0');
    expect(versions.php.releaseType).toEqual('patch');
  });

  it('parses issue body correctly', () => {
    // This test is a glue between create-release-issue and process-release.
    const issueBody = [
      TEXT.versionChangeHeader,
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
      }),
    ].join('\n');

    const versions = getVersionsToRelease(issueBody);
    expect(versions).toEqual({
      javascript: expect.objectContaining({
        current: '0.0.1',
        releaseType: 'patch',
      }),
      php: expect.objectContaining({
        current: '0.0.1',
        releaseType: 'minor',
      }),
    });
  });
});
