var reduce = require('lodash-compat/collection/reduce');

module.exports = flattenBulkRequire;

// will flatten a call to bulk-require to only get
// the test cases object in an array
function flattenBulkRequire(bulk) {
  return reduce(
    bulk,
    flatten,
    []
  );
}

function flatten(flattened, testCase) {
  // while we are not on a test case, go deeper
  if (testCase.testName === undefined) {
    testCase = reduce(testCase, flatten, []);
  }

  return flattened.concat(testCase);
}
