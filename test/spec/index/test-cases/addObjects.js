var clone = require('lodash-compat/lang/clone');

var objects = [{
  first: 'object'
}, {
  second: 'object'
}];

module.exports = {
  object: 'index',
  methodName: 'addObjects',
  testName: 'index.addObjects(objects, cb)',
  callArguments: [objects],
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        action: 'addObject',
        body: clone(objects[0])
      }, {
        action: 'addObject',
        body: clone(objects[1])
      }]
    },
    URL: {
      pathname: '/1/indexes/%s/batch'
    }
  }
};
