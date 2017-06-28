'use strict';

const test = require('tape');

test('index.browseAll() and an error occurs', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');

  const bind = require('lodash-compat/function/bind');
  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const browser = index.browseAll('some', {
    hitsPerPage: 200,
  });

  fauxJax.once('request', browse);
  browser.once('error', error);
  browser.once('end', bind(t.fail, t));

  function browse(req) {
    req.respond(
      400,
      {},
      JSON.stringify({
        message: 'You are doomed',
        status: 400,
      })
    );

    fauxJax.restore();
  }

  function error(err) {
    t.ok(err instanceof Error, 'We got an error');
    t.equal(err.message, 'You are doomed', 'error message matches');
  }
});
