/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const recommend = require('@sefai/recommend');
const assert = require('assert');

assert.ok(recommend);
assert.doesNotThrow(() => recommend('..', '..'));

console.log('@sefai/recommend is valid CJS');
