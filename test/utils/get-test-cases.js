var reduce = require('lodash-compat/collection/reduce');

module.exports = getTestCases;

// will flatten a call to bulk-require to only get
// the test cases object in an array
function getTestCases(bulk) {
  return reduce(
    bulk,
    concatenateTestCases,
    []
  );
}

function concatenateTestCases(result, current) {
  // while we are not on a test case, go deeper
  if (current.testName === undefined) {
    current = reduce(current, concatenateTestCases, []);
  }

  return result.concat(current);
}
