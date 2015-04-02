// this file will run all `client/test-cases/**/*.js` and `index/test-cases/**/*.js`
var bulkRequire = require('bulk-require');
var flatten = require('lodash-compat/array/flatten');
var forEach = require('lodash-compat/collection/forEach');
var map = require('lodash-compat/collection/map');

var flattenBulkRequire = require('../../utils/flatten-bulk-require');
var runTestCase = require('../../utils/run-test-case');

// get and format all the test cases
// do not try to dynamically generate bulkRequire() calls, you cannot
var testCases = flatten([
  map(
    flattenBulkRequire(
      bulkRequire(__dirname + '/index/test-cases', '**/*.js')
    ),
    addProperty('object', 'index')
  ),
  map(
    flattenBulkRequire(
      bulkRequire(__dirname + '/client/test-cases', '**/*.js')
    ),
    addProperty('object', 'client')
  )
]);

// now run them all
forEach(testCases, runTestCase);

function addProperty(name, value) {

  return function(testCase) {
    testCase[name] = value;
    return testCase;
  };
}
