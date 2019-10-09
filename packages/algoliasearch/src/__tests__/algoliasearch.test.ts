import algoliasearch from '../builds/algoliasearch';

describe('algoliasearch', () => {
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
