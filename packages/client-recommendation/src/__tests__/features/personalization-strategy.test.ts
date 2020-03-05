import { PersonalizationStrategy } from '../..';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { SetPersonalizationStrategyResponse } from '../../types';

const testSuite = new TestSuite('personalization_strategy');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient().initRecommendation();

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

  const response: SetPersonalizationStrategyResponse = {
    status: 200,
    message: 'Strategy was successfully updated',
  };

  await expect(client.setPersonalizationStrategy(personalizationStrategy)).resolves.toEqual(
    response
  );

  await expect(client.getPersonalizationStrategy()).resolves.toEqual(personalizationStrategy);
});
