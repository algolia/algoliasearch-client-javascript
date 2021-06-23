import { MethodEnum } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { PersonalizationStrategy, SetPersonalizationStrategyResponse } from '../../types';

const searchClient = new TestSuite().algoliasearch('appId', 'apiKey', {
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  },
});
const recommendationClient = searchClient.initRecommendation();

describe('recommendation client', () => {
  it('logs a deprecation message', () => {
    expect(searchClient.transporter.logger.info).toHaveBeenCalledTimes(1);
    expect(searchClient.transporter.logger.info).toHaveBeenCalledWith(
      'The `initRecommendation` method is deprecated. Use `initPersonalization` instead.'
    );
  });

  it('uses region to define the host', () => {
    expect(recommendationClient.transporter.hosts[0].url).toBe('personalization.us.algolia.com');
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

  it('set personalization strategy', async () => {
    const transporterMock = spy(recommendationClient.transporter);
    const response: SetPersonalizationStrategyResponse = {
      status: 200,
      message: 'Strategy was successfully updated',
    };
    when(transporterMock.write(anything(), anything())).thenResolve(response);

    const setPersonalizationStrategyResponse = await recommendationClient.setPersonalizationStrategy(
      personalizationStrategy,
      { foo: 'bar' }
    );
    expect(setPersonalizationStrategyResponse).toEqual(response);

    verify(
      transporterMock.write(
        deepEqual({
          method: MethodEnum.Post,
          path: '1/strategies/personalization',
          data: personalizationStrategy,
        }),
        deepEqual({ foo: 'bar' })
      )
    ).once();
  });

  it('get personalization strategy', async () => {
    const transporterMock = spy(recommendationClient.transporter);
    when(transporterMock.read(anything(), anything())).thenResolve(personalizationStrategy);

    const getPersonalizationStrategyResponse = await recommendationClient.getPersonalizationStrategy();

    verify(
      transporterMock.read(
        deepEqual({
          method: MethodEnum.Get,
          path: '1/strategies/personalization',
        }),
        anything()
      )
    ).once();

    expect(getPersonalizationStrategyResponse).toEqual(personalizationStrategy);
  });
});
