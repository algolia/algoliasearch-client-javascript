var test = require('tape');

test('client.setExtraHeader(key, value)', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  // no extra header set
  index.search('first');

  client.setExtraHeader('X-great-header', 'yay');

  // extra header set
  index.search('second');

  var firstRequest = parse(fauxJax.requests[0].requestURL, true);
  var secondRequest = parse(fauxJax.requests[1].requestURL, true);

  t.notOk(
    firstRequest.query['X-great-header'],
    'No `X-great-header` set on first request'
  );

  t.equal(
    secondRequest.query['X-great-header'],
    'yay',
    '`X-great-header` set on second request'
  );

  fauxJax.requests[0].respond(200, {}, '{}');
  fauxJax.requests[1].respond(200, {}, '{}');

  fauxJax.restore();
});
