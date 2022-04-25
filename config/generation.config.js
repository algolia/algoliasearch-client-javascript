// eslint-disable-next-line import/no-commonjs
module.exports = {
  patterns: [
    // Ignore the roots and go down the tree by negating hand written files
    'specs/bundled/*.yml',

    'clients/**',
    'clients/**/.*', // hidden files are not ignored by default
    '!clients/README.md',
    '!clients/**/.openapi-generator-ignore',

    // Java
    '!clients/algoliasearch-client-java-2/*.gradle',
    '!clients/algoliasearch-client-java-2/algoliasearch-core/build.gradle',
    '!clients/algoliasearch-client-java-2/algoliasearch-core/src/com/algolia/exceptions/*',
    '!clients/algoliasearch-client-java-2/algoliasearch-core/src/com/algolia/utils/*',
    'clients/algoliasearch-client-java-2/algoliasearch-core/com/algolia/utils/echo/EchoResponse*.java',
    '!clients/algoliasearch-client-java-2/algoliasearch-core/com/algolia/utils/echo/EchoResponseInterface.java',

    // JavaScript
    '!clients/algoliasearch-client-javascript/*',
    '!clients/algoliasearch-client-javascript/.github/**',
    '!clients/algoliasearch-client-javascript/.yarn/**',
    '!clients/algoliasearch-client-javascript/scripts/**',
    '!clients/algoliasearch-client-javascript/packages/algoliasearch/**',
    '!clients/algoliasearch-client-javascript/packages/requester-*/**',
    '!clients/algoliasearch-client-javascript/packages/client-common/**',

    // PHP
    '!clients/algoliasearch-client-php/lib/Configuration/*',
    'clients/algoliasearch-client-php/lib/*.php',
    'clients/algoliasearch-client-php/lib/Api/*',
    'clients/algoliasearch-client-php/lib/Configuration/Configuration.php',
  ],
};
