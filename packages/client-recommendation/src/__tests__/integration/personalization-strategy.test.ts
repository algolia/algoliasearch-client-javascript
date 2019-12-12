import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';

import { PersonalizationStrategy, SetPersonalizationStrategyResponse } from '../../types';

const testSuite = new TestSuite('personalization_strategy');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const client = testSuite.makeRecommendationClient();

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

  const setPersonalizationStrategyResponse = await client.setPersonalizationStrategy(
    personalizationStrategy
  );

  expect(setPersonalizationStrategyResponse).toEqual({
    status: 200,
    message: 'Strategy was successfully updated',
  } as SetPersonalizationStrategyResponse);

  const getPersonalizationStrategyResponse = await client.getPersonalizationStrategy();
  expect(getPersonalizationStrategyResponse).toEqual(personalizationStrategy);
});
