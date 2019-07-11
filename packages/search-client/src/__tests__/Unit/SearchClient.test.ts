import { SearchClient } from '../..';
import { Transporter } from '@algolia/transporter';
import { NullLogger } from '@algolia/logger-types';
import { instance, mock } from 'ts-mockito';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';

const transporter = new Transporter({
  headers: {},
  hosts: [],
  logger: new NullLogger(),
  requester: instance(mock(BrowserXhrRequester)),
  timeouts: {
    read: 2,
    write: 30,
  },
});

const searchClient = new SearchClient({
  transporter,
  appId: 'appId',
  apiKey: 'apiKey',
});

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(searchClient.transporter).toBeInstanceOf(Transporter);
  });

  it('Gives access to appId', () => {
    expect(searchClient.appId).toEqual('appId');
  });
});
