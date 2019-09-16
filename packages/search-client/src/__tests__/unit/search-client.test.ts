import { SearchClient } from '../../..';
import { Transporter } from '@algolia/transporter';
import { instance, mock } from 'ts-mockito';
import { UserAgent } from '@algolia/transporter-types';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

const searchClient = new SearchClient({
  transporter: instance(transporterMock),
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0-alpha.0'),
});

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(searchClient.transporter).toBe(transporter);
  });

  it('Gives access to appId', () => {
    expect(searchClient.appId).toEqual('appId');
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
