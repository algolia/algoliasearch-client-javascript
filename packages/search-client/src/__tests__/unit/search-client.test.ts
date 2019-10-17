import { AuthMode } from '@algolia/auth';
import { Method } from '@algolia/requester-types';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { deepEqual, instance, mock, verify } from 'ts-mockito';

import { createSearchClient } from '../../../../algoliasearch/src/presets/default';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

const searchClient = createSearchClient({
  transporter,
  appId: 'foo',
  apiKey: 'bar',
  userAgent: UserAgent.create('4.0.0'),
  authMode: AuthMode.WithinQueryParameters,
});

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(searchClient.transporter).toBe(transporter);
  });

  it('Gives access to appId', () => {
    expect(searchClient.appId).toEqual('foo');
  });

  it('Sets default headers', () => {
    expect(transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
    });

    expect(transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0)',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });
  });
});

describe('personalization', () => {
  it('set personalization strategy', async () => {
    const strategy = {
      eventsScoring: {
        'Add to cart': { score: 50, type: 'conversion' },
        Purchase: { score: 100, type: 'conversion' },
      },
      facetsScoring: {
        brand: { score: 100 },
        categories: { score: 10 },
      },
    };

    await searchClient.setPersonalizationStrategy(strategy, { foo: 'bar' });

    verify(
      transporterMock.write(
        deepEqual({
          method: Method.Post,
          path: '1/recommendation/personalization/strategy',
          data: strategy,
        }),
        deepEqual({ foo: 'bar' })
      )
    ).once();
  });
});
