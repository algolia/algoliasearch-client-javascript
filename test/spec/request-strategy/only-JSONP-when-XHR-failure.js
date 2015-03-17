var test = require('tape');

test('Request strategy uses only JSONP if one XHR fails', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');

  var createFixture = require('../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host
      ],
      timeout: 5000
    },
    indexName: 'simple-JSONP-response'
  });

  var firstCallback = sinon.spy(function() {
    t.ok(
      firstCallback.calledOnce,
      'First callback called once'
    );

    t.equal(
      fauxJax.requests.length,
      1,
      'Only one XHR done'
    );

    t.deepEqual(
      firstCallback.args[0],
      [null, {query: 'first'}],
      'First callback called with null, {"query": "first"}'
    );

    index.search('second', secondCallback);
  });

  var secondCallback = sinon.spy(function() {
    t.ok(
      secondCallback.calledOnce,
      'Second callback called once'
    );

    t.equal(
      fauxJax.requests.length,
      1,
      'Still one XHR done, we now use JSONP'
    );

    t.deepEqual(
      secondCallback.args[0],
      [null, {query: 'second'}],
      'Second callback called with null, {"query": "second"}'
    );

    fauxJax.restore();
    t.end();
  });

  var index = fixture.index;

  fauxJax.install();

  index.search('first', firstCallback);

  t.equal(
    fauxJax.requests.length,
    1,
    'One request made'
  );

  fauxJax.requests[0].respond(500, {}, JSON.stringify({message: 'woops', status: 500}));
});
