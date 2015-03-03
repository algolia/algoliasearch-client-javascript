var test = require('tape');

var requestTimeout = 2000;

test('Request strategy will create script tags when using JSONP', function(t) {
  var every = require('lodash-compat/collection/every');
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var some = require('lodash-compat/collection/some');

  var createFixture = require('../../utils/create-fixture');

  var clock = sinon.useFakeTimers();
  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      dsnHost: currentURL.host
    },
    indexName: 'simple-JSONP-response'
  });

  var index = fixture.index;

  fauxJax.install();

  var initialScriptTags = document.getElementsByTagName('script');
  var initialScriptTagsCount = initialScriptTags.length;

  // check that the current state is clean
  t.ok(
    every(initialScriptTags, function noJSONPTag(script) {
      if (!script.src ||
        parse(script.src).pathname !== '/1/indexes/simple-JSONP-response') {
        return true;
      }
    }),
    'No script matches a JSONP script'
  );

  var spy = sinon.spy(function searchCallback() {
    t.ok(spy.calledOnce, 'Callback was called once');
    t.deepEqual(
      spy.getCall(0).args, [
        true, {
          yaw: 'JSONP'
        }
      ],
      'Callback called with true, {"yaw": "JSONP"}'
    );

    // script tag deletion is done after calling our callback
    setTimeout(function waitForEndOfSearchCallback() {
      var postCallbackScriptTags = document.getElementsByTagName('script');

      t.equal(
        postCallbackScriptTags.length,
        initialScriptTagsCount,
        'Script tag count back to previous'
      );

      t.ok(
        every(postCallbackScriptTags, function noJSONPTag(script) {
          if (!script.src ||
            parse(script.src).pathname !== '/1/indexes/simple-JSONP-response') {
            return true;
          }
        }),
        'No more script matches a JSONP script'
      );

      t.end();
    }, 0);
  });

  index.search('hello', spy);

  // XHR timeouts
  clock.tick(requestTimeout);
  clock.tick(requestTimeout * 2);
  clock.tick(requestTimeout * 3);
  clock.tick(requestTimeout * 4);
  clock.restore();

  t.equal(
    fauxJax.requests.length,
    4,
    'Four requests made'
  );

  var currentScriptTags = document.getElementsByTagName('script');

  t.equal(
    currentScriptTags.length,
    initialScriptTagsCount + 1,
    'We added one script tag'
  );

  t.ok(
    some(currentScriptTags, function noJSONPTag(script) {
      if (script.src && parse(script.src).pathname === '/1/indexes/simple-JSONP-response') {
        return true;
      }
    }),
    'A new script matches a JSONP script'
  );

  fauxJax.restore();
});
