var cloneDeep = require('lodash-compat/lang/cloneDeep');
var merge = require('lodash-compat/object/merge');
var sinon = require('sinon');

var baseTestCase = {
  object: 'index',
  methodName: 'getObject'
};

module.exports = [
  merge(
    cloneDeep(baseTestCase), {
      testName: 'index.getObject(objectID, cb)',
      callArguments: ['first object'],
      expectedRequest: {
        method: 'GET',
        headers: {},
        URL: {
          pathname: '/1/indexes/%s/' + encodeURIComponent('first object')
        }
      }
    }
  ),
  merge(
    cloneDeep(baseTestCase), {
      testName: 'index.getObject(objectID, cb, attributes)',
      callArguments: ['second object', sinon.spy(), ['some', 'attrs']],
      expectedRequest: {
        method: 'GET',
        headers: {},
        URL: {
          pathname: '/1/indexes/%s/' + encodeURIComponent('second object'),
          query: {
            attributes: ['some', 'attrs'].join(',')
          }
        }
      }
    }
  )
];
