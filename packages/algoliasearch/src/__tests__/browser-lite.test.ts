import version from '@algolia/client-common';

import algoliasearch from '../builds/browser-lite';

const client = algoliasearch('appId', 'apiKey');

describe('algoliasearch for browser lite', () => {
  it('sets default headers', () => {
    expect(client.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
    });
  });

  it('sets default query pameters', () => {
    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });
  });

  it('sets default user agent', () => {
    expect(client.transporter.userAgent.value).toEqual(
      `Algolia for JavaScript (${version}); Browser (lite)`
    );
  });
});
