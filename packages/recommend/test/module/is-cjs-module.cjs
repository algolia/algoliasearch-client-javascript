/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const recommend = require('@algolia/recommend');
const assert = require('assert');

assert.ok(recommend);
assert.doesNotThrow(() => recommend('..', '..'));

console.log('@algolia/recommend is valid CJS');
