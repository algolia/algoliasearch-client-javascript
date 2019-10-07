import algoliasearch from '../builds/algoliasearch';

const clientApi = ['appId', 'transporter'];

const indexApi = ['indexName', 'transporter', 'search', 'searchForFacetValues'];

describe('algoliasearch', () => {
  it('respects client public api', () => {
    const client = algoliasearch('foo', 'bar');

    clientApi.forEach(property => client.hasOwnProperty(property));
  });

  it('respects index public api', () => {
    const index = algoliasearch('foo', 'bar').initIndex('foo');

    indexApi.forEach(property => index.hasOwnProperty(property));
  });

  it('sets default user agents', () => {
    const client = algoliasearch('foo', 'bar');

    expect(client.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });

    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0-alpha.0); Browser',
    });
  });
});
