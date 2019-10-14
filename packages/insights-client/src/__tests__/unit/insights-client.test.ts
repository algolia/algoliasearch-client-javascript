import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { instance, mock } from 'ts-mockito';

import { createInsightsClient } from '../../InsightsClient';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

const insightsClient = createInsightsClient({
  transporter: instance(transporterMock),
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0-alpha.0'),
});

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(insightsClient.transporter).toBe(transporter);
  });

  it('uses region', () => {
    expect(insightsClient.transporter.hosts[0].url).toBe('insights.us.algolia.io');
  });

  it('Gives access to appId', () => {
    expect(insightsClient.appId).toEqual('appId');
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
