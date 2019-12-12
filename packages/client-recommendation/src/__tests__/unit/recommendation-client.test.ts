import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';
import { MethodEnum } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { PersonalizationStrategy } from '../../types';

const recommendationClient = new TestSuite().algoliasearch('appId', 'apiKey').initRecommendation();

describe('recommendation client', () => {
  it('uses region to define the host', () => {
    expect(recommendationClient.transporter.hosts[0].url).toBe('recommendation.us.algolia.com');
  });

  it('sets default headers', () => {
    expect(recommendationClient.transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });

    expect(recommendationClient.transporter.queryParameters).toEqual({});
  });
});

describe('personalization', () => {
  const transporterMock = spy(recommendationClient.transporter);
  when(transporterMock.write(anything(), anything())).thenResolve({});

  it('set personalization strategy', async () => {
    const personalizationStrategy: PersonalizationStrategy = {
      eventsScoring: [
        { eventName: 'Add to cart', eventType: 'conversion', score: 50 },
        { eventName: 'Purchase', eventType: 'conversion', score: 100 },
      ],
      facetsScoring: [
        { facetName: 'brand', score: 100 },
        { facetName: 'categories', score: 10 },
      ],
      personalizationImpact: 0,
    };

    await recommendationClient.setPersonalizationStrategy(personalizationStrategy, { foo: 'bar' });

    verify(
      transporterMock.write(
        deepEqual({
          method: MethodEnum.Post,
          path: '1/recommendation/personalization/strategy',
          data: personalizationStrategy,
        }),
        deepEqual({ foo: 'bar' })
      )
    ).once();
  });
});
