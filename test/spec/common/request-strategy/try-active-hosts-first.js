'use strict';

var test = require('tape');

test('When using custom hosts, active hosts are tried first', function(t) {
  t.plan(7);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      hosts: {
        read: ['down-host.com', 'working-host.com'],
        write: []
      }
    }
  });

  var index = fixture.index;

  var reqHandlers = [function(req) {
    t.equal(
      parse(req.requestURL).hostname,
      'down-host.com',
      'First search, first request done on down-host.com'
    );

    // simulate network error
    req.respond(500, {}, JSON.stringify({message: 'Woopsie', status: 500}));
  }, function(req) {
    // second request on working-host.com
    t.equal(
      parse(req.requestURL).hostname,
      'working-host.com',
      'First search, second request done on working-host.com'
    );
    req.respond(200, {}, JSON.stringify({message: 'First search, second request'}));
  }, function(req) {
    // third request on working-host.com
    t.equal(
      parse(req.requestURL).hostname,
      'working-host.com',
      'Second search, first request done on working-host.com'
    );
    req.respond(200, {}, JSON.stringify({message: 'Second search, first request'}));
  }];

  var reqCount = 1;
  fauxJax.on('request', function(req) {
    if (reqCount > 3) {
      t.fail('Received more requests than planned');
    }
    reqHandlers[reqCount - 1](req);
    reqCount++;
  });

  firstSearch();

  function firstSearch() {
    index
      .search('one', function(err, res) {
        t.error(err, 'No error on first search');
        t.deepEqual(res, {message: 'First search, second request'}, 'First search receives right message');
        secondSearch();
      });
  }

  function secondSearch() {
    index.search('two', function(err, res) {
      t.error(err, 'No error on second search');
      t.deepEqual(res, {message: 'Second search, first request'}, 'Second search receives right message');
      fauxJax.restore();
    });
  }
});
