var cloneDeep = require('lodash-compat/lang/cloneDeep');
var merge = require('lodash-compat/object/merge');
var sinon = require('sinon');

var baseTestCase = {
  object: 'index',
  methodName: 'addObject'
};

module.exports = [
  merge(
    cloneDeep(baseTestCase), {
      testName: 'index.addObject(content, cb)',
      callArguments: [{
        yaw: 'one'
      }],
      expectedRequest: {
        method: 'POST',
        body: {
          yaw: 'one'
        },
        URL: {
          pathname: '/1/indexes/%s'
        }
      }
    }
  ),
  merge(
    cloneDeep(baseTestCase), {
      testName: 'index.addObject(content, cb, objectID)',
      callArguments: [{
        yaw: 'two'
      }, sinon.spy(), 'dsa dsd/ sa'],
      expectedRequest: {
        method: 'PUT',
        body: {
          yaw: 'two'
        },
        URL: {
          pathname: '/1/indexes/%s/' + encodeURIComponent('dsa dsd/ sa')
        }
      }
    }
  )
];
