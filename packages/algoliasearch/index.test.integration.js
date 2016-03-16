/* eslint-env mocha */
import algoliasearch from './index.js';
import expect from 'expect';

const {appId, apiKey, indexName} = process.env;
const client = algoliasearch({appId, apiKey});
const index = client.initIndex(indexName);

describe('algoliasearch()', () => {
  it('can delete the index', () => client.deleteIndex(indexName));
  it('has deleted the index', () => client.listIndexes().then(list => expect(list).toExist()));

  // it('can delete the index', () => client.deleteIndex(indexName));
});
