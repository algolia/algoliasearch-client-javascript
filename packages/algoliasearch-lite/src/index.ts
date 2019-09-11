import { algoliasearch } from './algoliasearch';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;

export { algoliasearch } from './algoliasearch';
export { SearchClient } from './SearchClient';
