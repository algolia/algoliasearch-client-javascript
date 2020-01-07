import algoliasearchType from 'algoliasearch';

const algoliasearch: typeof algoliasearchType = require('../../packages/algoliasearch');

const client = algoliasearch('..', '..');
console.log(client);
