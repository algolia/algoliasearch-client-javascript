import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { instance, mock } from 'ts-mockito';

import { createAnalyticsClient } from '../../AnalyticsClient';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

const analyticsClient = createAnalyticsClient({
  transporter: instance(transporterMock),
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0-alpha.0'),
});

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(analyticsClient.transporter).toBe(transporter);
  });

  it('uses region', () => {
    expect(analyticsClient.transporter.hosts[0].url).toBe('analytics.us.algolia.com');
  });

  it('Gives access to appId', () => {
    expect(analyticsClient.appId).toEqual('appId');
  });

  it('Sets default headers', () => {
    expect(transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });

    expect(transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0-alpha.0)',
    });
  });
});
