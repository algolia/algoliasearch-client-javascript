var test = require('tape');

test('client.setExtraHeader(key, value)', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  // no extra header set
  index.search('first');

  client.setExtraHeader('X-great-header', 'yay');

  // extra header set
  index.search('second');

  fauxJax.waitFor(2, function(err, requests) {
    t.error(err);
    fauxJax.restore();

    var firstRequest = requests[0];
    var secondRequest = requests[1];

    firstRequest.respond(200, {}, '{}');
    secondRequest.respond(200, {}, '{}');

    t.notOk(
      parse(firstRequest.requestURL, true).query['X-great-header'],
      'No `X-great-header` set on first request'
    );

    t.equal(
      parse(secondRequest.requestURL, true).query['X-great-header'],
      'yay',
      '`X-great-header` set on second request'
    );
  });
});
