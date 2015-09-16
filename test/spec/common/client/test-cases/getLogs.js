'use strict';

var cloneDeep = require('lodash/lang/cloneDeep');
var merge = require('lodash/object/merge');
var sinon = require('sinon');

var baseTestCase = {
  object: 'client',
  methodName: 'getLogs',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/logs'
    }
  }
};

module.exports = [
  merge(
    cloneDeep(baseTestCase), {
      testName: 'client.getLogs(cb)',
      expectedRequest: {
        URL: {
          query: {
            offset: '0',
            length: '10'
          }
        }
      }
    }
  ),
  merge(
    cloneDeep(baseTestCase), {
      testName: 'client.getLogs(offset, cb)',
      callArguments: [25, sinon.spy()],
      expectedRequest: {
        URL: {
          query: {
            offset: '25',
            length: '10'
          }
        }
      }
    }
  ),
  merge(
    cloneDeep(baseTestCase), {
      testName: 'client.getLogs(offset, length, cb)',
      callArguments: [30, 20, sinon.spy()],
      expectedRequest: {
        URL: {
          query: {
            offset: '30',
            length: '20'
          }
        }
      }
    }
  )
];
