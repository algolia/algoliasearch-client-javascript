/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const algoliasearch = require('algoliasearch');
const assert = require('assert');

assert.ok(algoliasearch);
assert.doesNotThrow(() => algoliasearch('..', '..'));

console.log('algoliasearch is valid CJS');
