var test = require('tape');

test('Last working timeout multiplier is reused', function(t) {
  var fauxJax = require('faux-jax');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var baseTimeout = 20;
  var fixture = createFixture({clientOptions: {timeout: baseTimeout}});
  var fixture2 = createFixture({
    credentials: fixture.credentials,
    clientOptions: {timeout: baseTimeout}
  });
  var fixture3 = createFixture({
    credentials: fixture.credentials,
    clientOptions: {timeout: baseTimeout}
  });

  var firstClientIndex = fixture.index;
  var secondClientIndex = fixture2.index;
  var thirdClientIndex = fixture3.index;

  var reqHandlers = [function(req) {
    t.pass();

    // first search, timeout
    setTimeout(function() {
      req.respond(200, {}, JSON.stringify({search: 'first timeout'}));
    }, baseTimeout * 1.5);
  }, function(req) {
    t.pass();

    // first search, answers
    setTimeout(function() {
      req.respond(200, {}, JSON.stringify({search: 'first'}));
    }, baseTimeout * 1.5);
  }, function(req) {
    t.pass();

    // second search, answers because we remember last good timeout
    setTimeout(function() {
      req.respond(200, {}, JSON.stringify({search: 'second'}));
    }, baseTimeout * 1.5);
  }, function(req) {
    t.pass();

    // third search, timeout, we reset timeouts after RESET_APP_DATA_TIMER
    setTimeout(function() {
      req.respond(200, {}, JSON.stringify({search: 'third timeout'}));
    }, baseTimeout + 1);
  }, function(req) {
    // third search, answers, we raised timeout again
    setTimeout(function() {
      req.respond(200, {}, JSON.stringify({search: 'third'}));
    }, baseTimeout * 1.5);
  }];

  var reqCount = 1;
  fauxJax.on('request', function(req) {
    if (reqCount > 5) {
      t.fail('Received more requests than planned');
    }
    reqHandlers[reqCount - 1](req);
    reqCount++;
  });

  firstSearch();

  function firstSearch() {
    firstClientIndex
      .search('one', function(err, res) {
        t.error(err, 'No error on first search');
        t.equal(res.search, 'first');
        secondSearch();
      });
  }

  function secondSearch() {
    secondClientIndex.search('two', function(err, res) {
      t.error(err, 'No error on second search');
      t.equal(res.search, 'second');
      setTimeout(thirdSearch, parseInt(process.env.RESET_APP_DATA_TIMER, 10));
    });
  }

  function thirdSearch() {
    thirdClientIndex.search('three', function(err, res) {
      t.error(err, 'No error on third search');
      t.equal(res.search, 'third');
      t.pass();
      setTimeout(function() {
        fauxJax.restore();
        t.end();
      }, baseTimeout * 4);
    });
  }
});
