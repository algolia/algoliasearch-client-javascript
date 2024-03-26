/* eslint-disable no-console */
import recommend from '@algolia/recommend';
import assert from 'assert';

assert.ok(recommend);
assert.doesNotThrow(() => recommend('..', '..'));

console.log('@algolia/recommend is valid ESM');
