var test = require('tape');

test('Request strategy does as many tries as hosts', function(t) {
  var fauxJax = require('faux-jax');
  var sinon = require('sinon');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        'first.com',
        'second.com',
        'third.com',
        'fourth.com',
        'fifth.com'
      ]
    }
  });

  var index = fixture.index;

  var searchCallback = sinon.spy(function() {
    t.ok(
      searchCallback.calledOnce,
      'Search callback was called once'
    );

    t.deepEqual(
      searchCallback.args[0],
      [null, {hosts: 'YES!'}]
    );

    fauxJax.restore();

    t.end();
  });

  fauxJax.install();

  index.search('smg', searchCallback);

  fauxJax.requests[0].respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
  fauxJax.requests[1].respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
  fauxJax.requests[2].respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
  fauxJax.requests[3].respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));

  fauxJax.requests[4].respond(200, {}, JSON.stringify({hosts: 'YES!'}));
});
