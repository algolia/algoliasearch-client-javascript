import algoliasearch from '../builds/algoliasearch-lite';

const clientApi = ['appId', 'transporter'];

const indexApi = ['indexName', 'transporter', 'search', 'searchForFacetValues'];

describe('lite', () => {
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
    });

    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0-alpha.0); Browser (lite)',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });
  });
});
