'use strict';

module.exports = [
  {
    testName: 'client.getPersonalizationStrategy()',
    object: 'client',
    methodName: 'getPersonalizationStrategy',
    callArguments: [],
    action: 'read',
    expectedRequest: {
      method: 'GET',
      URL: {pathname: '/1/recommendation/personalization/strategy'}
    }
  }
];
