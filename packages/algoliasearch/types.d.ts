// @todo update `@nunomaduro/lightsearch` to `algoliasearch` once we have a beta out.

declare module '@nunomaduro/lightsearch' {
  // eslint-disable-next-line import/no-unresolved
  import algoliasearch from 'algoliasearch/builds/browser';
  export default algoliasearch;
}

declare module '@nunomaduro/lightsearch/lite' {
  // eslint-disable-next-line import/no-unresolved
  import algoliasearch from 'algoliasearch/builds/browser-lite';
  export default algoliasearch;
}
