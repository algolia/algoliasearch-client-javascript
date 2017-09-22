module.exports = {
  extends: ['algolia/flowtype', 'algolia/jest'],
  rules: {
    'no-warning-comments': 'warn', // Must be removed at release time
    // eslint doesn't understand a workspace
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    // eslint can't know that we're making all the algoliasearch.* packages here
    'import/ignore': ['algoliasearch.*'],
  },
};
