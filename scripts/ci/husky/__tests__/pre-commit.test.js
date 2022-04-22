/* eslint-disable import/no-commonjs */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createMemoizedMicromatchMatcher } = require('../pre-commit');

describe('createMemoizedMicromatchMatcher', () => {
  it('matches correctly', () => {
    const matcher = createMemoizedMicromatchMatcher([
      'clients/**',
      '!clients/README.md',
    ]);

    expect(matcher('clients/README.md')).toEqual(false);
    expect(matcher('clients/CONTRIBUTING.md')).toEqual(true);
  });

  it('prioritizes the exact match when two patterns conflict', () => {
    const matcher = createMemoizedMicromatchMatcher([
      '!lib/Configuration/*',
      'lib/Configuration/Configuration.php',
    ]);

    expect(matcher('lib/Configuration/Configuration.php')).toEqual(true);
  });
});
