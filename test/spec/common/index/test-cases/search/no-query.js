'use strict';

var cloneDeep = require('lodash/lang/cloneDeep');

var commonExpectedRequest = {
  method: 'POST',
  URL: {pathname: '/1/indexes/%s/query'},
  body: {
    params: 'query='
  }
};

module.exports = [{
  testName: 'index.search(undefined, cb)',
  methodName: 'search',
  callArguments: [undefined],
  action: 'read',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: 'index.search(null, cb)',
  methodName: 'search',
  callArguments: [null],
  action: 'read',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: "index.search('', cb)",
  methodName: 'search',
  callArguments: [''],
  action: 'read',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: 'index.search(cb)',
  methodName: 'search',
  callArguments: [],
  action: 'read',
  expectedRequest: cloneDeep(commonExpectedRequest)
}];
