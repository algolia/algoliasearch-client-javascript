import { algoliasearch } from './src/algoliasearch';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;

export { algoliasearch } from './src/algoliasearch';
export { SearchClient } from './src/SearchClient';
