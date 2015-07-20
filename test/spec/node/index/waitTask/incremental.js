'use strict';

var test = require('tape');

// for this test to pass well you must have the test tab
// focused otherwise some timers will not pass
test('index.waitTask(taskID) has an incremental delay', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;
  var delays = [];

  fauxJax.install();
  waitFirstRequest();

  var start = +new Date();
  index.waitTask(28000, callback);

  function callback(err, content) {
    fauxJax.restore();
    t.error(err, 'No error while calling waitTask');
    t.ok(content, 'We got some content');
    t.ok(
      delays[2] > delays[1] * 2,
      'Second retry waited more than first retry * 2 (' + delays[2] + ', ' + delays[1] + ')'
    );
  }

  function waitFirstRequest() {
    fauxJax.once('request', function requestMade(req) {
      delays.push(+new Date() - start);
      waitSecondRequest();

      req.respond(
        200,
        {},
        JSON.stringify({
          status: 'notPublished'
        })
      );
    });
  }

  function waitSecondRequest() {
    fauxJax.once('request', function requestMade(req) {
      delays.push(+new Date() - start - delays[0]);
      waitThirdRequest();

      req.respond(
        200,
        {},
        JSON.stringify({
          status: 'notPublished'
        })
      );
    });
  }

  function waitThirdRequest() {
    fauxJax.once('request', function requestMade(req) {
      delays.push(+new Date() - start - delays[1]);
      req.respond(
        200,
        {},
        JSON.stringify({
          status: 'published'
        })
      );
    });
  }
});
