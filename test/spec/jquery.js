var test = require('tape');

var browser = require('bowser').browser;

// run jQuery test on all browsers but IE < 10
// jQuery 2 does not support cross domain xhr with IE < 10
// why do we even have a jQuery build?
// http://jquery.com/download/#jquery-2-x
// guess what there's even a plugin! http://cdnjs.com/libraries/jquery-ajaxtransport-xdomainrequest
if (!browser.msie || parseFloat(browser.version) > 9) {
  test('jQuery module success case', function(t) {
    t.plan(9);

    var fauxJax = require('faux-jax');
    var parse = require('url-parse');

    // load jQuery Algolia Search module
    require('../../src/algoliasearch.jquery');

    t.ok(global.$.algolia, 'we exported an `algolia` property on jQuery');

    var client = global.$.algolia.Client('jquery-success-applicationID', 'jquery-success-apiKey');
    var index = client.initIndex('jquery-success-indexName');

    fauxJax.install();

    t.equal(
      fauxJax.requests.length,
      0,
      'No request made'
    );

    index.search('jquery-success-promise').done(function searchDone(content) {
      t.deepEqual(content, {
        'YAW': 'jquery-promise'
      });
    });

    index.search('jquery-success-callback', function searchDone(err, content) {
      t.error(err, 'No error while using the jQuery module');
      t.deepEqual(content, {
        'YAW': 'jquery-cb'
      });
    });

    t.equal(
      fauxJax.requests.length,
      2,
      'Two requests made'
    );

    var firstRequest = fauxJax.requests[0];
    var secondRequest = fauxJax.requests[1];
    var requestURL = parse(firstRequest.requestURL, true);

    t.equal(
      requestURL.host,
      'jquery-success-applicationid-dsn.algolia.net',
      'requestURL host matches'
    );

    t.equal(
      requestURL.pathname,
      '/1/indexes/jquery-success-indexName/query',
      'requestURL pathname matches'
    );

    t.deepEqual(
      requestURL.query, {
        'X-Algolia-API-Key': 'jquery-success-apiKey',
        'X-Algolia-Application-Id': 'jquery-success-applicationID'
      },
      'requestURL query matches'
    );

    firstRequest.respond(
      200,
      {},
      JSON.stringify({
        'YAW': 'jquery-promise'
      })
    );

    secondRequest.respond(
      200,
      {},
      JSON.stringify({
        'YAW': 'jquery-cb'
      })
    );

    fauxJax.restore();
  });

  test.skip('jQuery module error case', function() {

  });
}
