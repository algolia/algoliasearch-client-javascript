/* eslint-disable no-console */
import recommend from '@sefai/recommend';
import assert from 'assert';

assert.ok(recommend);
assert.doesNotThrow(() => recommend('..', '..'));

console.log('@sefai/recommend is valid ESM');
