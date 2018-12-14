'use strict';

module.exports = [
  {
    testName: 'client.setPersonalizationStrategy()',
    object: 'client',
    methodName: 'setPersonalizationStrategy',
    callArguments: [{
      eventsScoring: {
        'Add to cart': {score: 50, type: 'conversion'},
        Purchase: {score: 100, type: 'conversion'}
      },
      facetsScoring: {
        brand: {score: 100},
        categories: {score: 10}
      }
    }],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {pathname: '/1/recommendation/personalization/strategy'},
      body: {
        eventsScoring: {
          'Add to cart': {score: 50, type: 'conversion'},
          Purchase: {score: 100, type: 'conversion'}
        },
        facetsScoring: {
          brand: {score: 100},
          categories: {score: 10}
        }
      }
    }
  }
];
