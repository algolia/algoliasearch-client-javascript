'use strict';

// this file will run all `client/test-cases/**/*.js` and `index/test-cases/**/*.js`
const bulkRequire = require('bulk-require');
const flatten = require('lodash-compat/array/flatten');
const forEach = require('lodash-compat/collection/forEach');
const map = require('lodash-compat/collection/map');

const flattenBulkRequire = require('../../utils/flatten-bulk-require');
const runTestCase = require('../../utils/run-test-case');

// get and format all the test cases
// do not try to dynamically generate bulkRequire() calls, you cannot
const testCases = flatten([
  map(
    flattenBulkRequire(bulkRequire(`${__dirname}/index/test-cases`, '**/*.js')),
    addProperty('object', 'index')
  ),
  map(
    flattenBulkRequire(
      bulkRequire(`${__dirname}/client/test-cases`, '**/*.js')
    ),
    addProperty('object', 'client')
  ),
]);

// now run them all
forEach(testCases, runTestCase);

function addProperty(name, value) {
  return function(testCase) {
    testCase[name] = value;
    return testCase;
  };
}
