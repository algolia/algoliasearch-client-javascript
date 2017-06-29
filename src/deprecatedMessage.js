module.exports = function deprecatedMessage(previousUsage, newUsage) {
  const githubAnchorLink = previousUsage
    .toLowerCase()
    .replace('.', '')
    .replace('()', '');

  return `algoliasearch: \`${previousUsage}\` was replaced by \`${newUsage}\`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#${githubAnchorLink}`;
};
