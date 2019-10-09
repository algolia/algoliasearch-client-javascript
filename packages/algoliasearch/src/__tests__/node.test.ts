import algoliasearch from '../builds/node';

describe('node', () => {
  it('sets default user agents', () => {
    const client = algoliasearch('foo', 'bar');

    expect(client.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });

    const nodeVersion = process.versions.node;

    // eslint-disable-next-line radix
    expect(parseInt(nodeVersion)).toBeGreaterThanOrEqual(8);

    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-agent': `Algolia for JavaScript (4.0.0-alpha.0); Node.js (${nodeVersion})`,
    });
  });
});
