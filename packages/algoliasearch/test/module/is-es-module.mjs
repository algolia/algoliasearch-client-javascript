/* eslint-disable no-console */
import algoliasearch from 'algoliasearch';
import assert from 'assert';

assert.ok(algoliasearch);
assert.doesNotThrow(() => algoliasearch('..', '..'));

console.log('algoliasearch is valid ESM');
