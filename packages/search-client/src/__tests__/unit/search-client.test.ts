import { SearchClient } from '../..';
import { Transporter } from '@algolia/transporter';
import { instance, mock } from 'ts-mockito';
import { UserAgent } from '@algolia/transporter-types';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

const searchClient = new SearchClient({
  transporter: instance(transporterMock),
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0'),
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
      'X-Algolia-Application-Id': 'appId',
      'X-Algolia-API-Key': 'apiKey',
      'Content-Type': 'application/json',
      'User-Agent': 'Algolia for Javascript (4.0.0)',
    });
  });
});
