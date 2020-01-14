import { version } from '@algolia/client-common';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const analyticsClient = new TestSuite().algoliasearch('appId', 'apiKey').initAnalytics();

describe('analytics client', () => {
  it('uses region to define the host', () => {
    expect(analyticsClient.transporter.hosts[0].url).toBe('analytics.us.algolia.com');
  });

  it('has version', () => {
    expect(analyticsClient.version).toBe(version);
    expect(analyticsClient.version.startsWith('4.')).toBe(true);
  });

  it('sets default headers', () => {
    expect(analyticsClient.transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });

    expect(analyticsClient.transporter.queryParameters).toEqual({});
  });
});
