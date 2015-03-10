var test = require('tape');

// this test uses the utils/support-server to get JSONP responses
test('Request-strategy: Use DSN host first', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../utils/create-fixture');

  var fixture = createFixture({
    clientOptions: {
      hosts: [
        'yawdsn.com',
        'booya.com',
        'booyou.com',
        'booyi.com',
        'boolala.com',
        'boodibu.com'
      ]
    }
  });

  var index = fixture.index;

  fauxJax.install();

  index.search('hello');

  t.equal(
    fauxJax.requests.length,
    1,
    'One request made'
  );

  var request = fauxJax.requests[0];

  t.equal(
    parse(request.requestURL).hostname,
    'yawdsn.com',
    'First request was done using the dsn host'
  );

  request.respond(200, {}, '{}');

  fauxJax.restore();
  t.end();
});
