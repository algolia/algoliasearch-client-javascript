import { Transporter } from '@algolia/transporter';

import algoliasearch from '../../../../algoliasearch/src/builds/browser';

const analyticsClient = algoliasearch('appId', 'apiKey').initAnalytics();

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(analyticsClient.transporter).toBeInstanceOf(Transporter);
  });

  it('uses region to define the host', () => {
    expect(analyticsClient.transporter.hosts[0].url).toBe('analytics.us.algolia.com');
  });

  it('Sets default headers', () => {
    expect(analyticsClient.transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });

    expect(analyticsClient.transporter.queryParameters).toEqual({});
  });
});
