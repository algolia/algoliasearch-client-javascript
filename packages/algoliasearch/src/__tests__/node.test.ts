import algoliasearch from '../builds/node';

const client = algoliasearch('appId', 'apiKey');

describe('algoliasearch for node', () => {
  it('sets default headers', () => {
    expect(client.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });
  });

  it('sets default query pameters', () => {
    expect(client.transporter.queryParameters).toEqual({});
  });

  it('sets default user agent', () => {
    const nodeVersion = process.versions.node;

    expect(client.transporter.userAgent.value).toEqual(
      `Algolia for JavaScript (4.0.0-alpha.0); Node.js (${nodeVersion})`
    );
  });
});
