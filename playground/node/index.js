const algoliasearch = require('@nunomaduro/lightsearch/lite');

const index = algoliasearch('CU1AX86Y0U', 'eedb46f32357b764bf85b4785fc0fe5f').initIndex(
  'instant_search'
);

index.search('foo').then(res => console.log(res));
