import algoliasearch from '../builds/browser-lite';

describe('algolisearch lite', () => {
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
