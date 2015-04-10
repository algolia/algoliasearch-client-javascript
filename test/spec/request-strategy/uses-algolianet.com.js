var test = require('tape');

test('Request strategy uses algolianet.com when DSN failed', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;

  var searchCallback = sinon.spy(function() {
    t.equal(
      parse(fauxJax.requests[1].requestURL).hostname,
      fixture.credentials.applicationID.toLowerCase() + '-1.algolianet.com',
      'We are using algolianet.com'
    );

    t.ok(
      searchCallback.calledOnce,
      'Search callback was called once'
    );

    t.deepEqual(
      searchCallback.args[0],
      [true, {hosts: 'YES algolianet!'}]
    );

    fauxJax.restore();
  });

  fauxJax.install();

  index.search('smg', searchCallback);

  fauxJax.requests[0].respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
  fauxJax.requests[1].respond(200, {}, JSON.stringify({hosts: 'YES algolianet!'}));
});
