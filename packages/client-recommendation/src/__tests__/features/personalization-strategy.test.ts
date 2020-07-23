import { PersonalizationStrategy } from '../..';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { SetPersonalizationStrategyResponse } from '../../types';

const testSuite = new TestSuite('personalization_strategy');

test(testSuite.testName, async () => {
  // On the CI, we parallelize too many calls to this endpoint. Making
  // the API slow to respond, and reaching a timeout. These specific
  // timeouts should ensure the test suite works as expected.
  const client = testSuite.makeSearchClient().initRecommendation({
    timeouts: {
      connect: 30,
      read: 30,
      write: 30,
    },
  });

  const personalizationStrategy: PersonalizationStrategy = {
    eventsScoring: [
      {
        eventName: 'Add to cart',
        eventType: 'conversion',
        score: 50,
      },
      {
        eventName: 'Purchase',
        eventType: 'conversion',
        score: 100,
      },
    ],
    facetsScoring: [
      { facetName: 'brand', score: 100 },
      { facetName: 'categories', score: 10 },
    ],
    personalizationImpact: 0,
  };

  const successResponse: SetPersonalizationStrategyResponse = {
    status: 200,
    message: 'Strategy was successfully updated',
  };

  const errorResponse: SetPersonalizationStrategyResponse = {
    status: 429,
    message: 'Number of strategy saves exceeded for the day',
  };

  try {
    const response = await client.setPersonalizationStrategy(personalizationStrategy);
    expect(response).toEqual(successResponse);
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toEqual(expect.objectContaining({ name: 'ApiError', ...errorResponse }));
  }

  await expect(client.getPersonalizationStrategy()).resolves.toEqual(personalizationStrategy);
});
