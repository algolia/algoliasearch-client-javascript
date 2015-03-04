var test = require('tape');

test('client.setUserToken(token)', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  // no extra header set
  index.search('first');
  fauxJax.requests[0].respond(200, {}, '{}');
  t.notOk(
    parse(fauxJax.requests[0].requestURL, true).query['X-Algolia-UserToken'],
    'No `X-Algolia-UserToken` set on first request'
  );

  client.setUserToken('foo/bar');

  // extra header set
  index.search('second');
  fauxJax.requests[1].respond(200, {}, '{}');
  t.ok(
    fauxJax.requests[1].requestURL.indexOf('&X-Algolia-UserToken=foo%2Fbar') > -1,
    '`X-Algolia-UserToken` is set and URL encoded'
  );
  t.equal(
    parse(fauxJax.requests[1].requestURL, true).query['X-Algolia-UserToken'],
    'foo/bar',
    '`X-Algolia-UserToken` set on second request'
  );

  fauxJax.restore();
});
