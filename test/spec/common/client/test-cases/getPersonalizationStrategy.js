'use strict';

module.exports = [
  {
    testName: 'client.getPersonalizationStrategy()',
    object: 'client',
    methodName: 'getPersonalizationStrategy',
    callArguments: [],
    action: 'write',
    expectedRequest: {
      method: 'GET',
      URL: {pathname: '/1/recommendation/personalization/strategy'}
    }
  }
];
