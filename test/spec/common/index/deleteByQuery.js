'use strict';

var test = require('tape');

test('index.deleteByQuery(query)', function(t) {
  deleteByQueryTest('callback', t);
  deleteByQueryTest('promise', t);
});

function deleteByQueryTest(asyncMode, mainTest) {
  mainTest.test('using a ' + asyncMode, function(t) {
    t.plan(12);

    var bind = require('lodash/function/bind');
    var fauxJax = require('faux-jax');
    var sinon = require('sinon');

    var createFixture = require('../../../utils/create-fixture');
    var fixture = createFixture();
    var index = fixture.index;

    sinon.spy(index, 'search');
    sinon.spy(index, 'deleteObjects');
    sinon.spy(index, 'waitTask');
    sinon.spy(index, 'deleteByQuery');

    fauxJax.install();

    fauxJax.once('request', respondToSearch);

    if (asyncMode === 'callback') {
      index.deleteByQuery('salmon', function(err) {
        t.error(err, 'No error while deleting by query');
        t.equal(
          arguments.length,
          1,
          'Only one argument in callback'
        );
        fauxJax.restore();
      });
    } else if (asyncMode === 'promise') {
      index.deleteByQuery('salmon').then(function() {
        t.pass('No error while deleting by query');
        t.equal(
          arguments.length,
          1,
          'Only one argument in callback'
        );
        fauxJax.restore();
      }, bind(t.fail, t));
    }

    function respondToSearch(req) {
      // reset spy state, we do not care about first deleteByQuery call,
      // we know how it was called
      index.deleteByQuery.reset();

      // check how .search was called
      t.ok(index.search.calledOnce, 'search called');
      t.ok(
        index.search.calledWith('salmon', {
          attributesToRetrieve: 'objectID',
          hitsPerPage: 1000,
          distinct: false
        }),
        'search called with good params'
      );

      index.search.reset();

      fauxJax.once('request', respondToDeleteObjects);
      req.respond(
        200,
        {},
        JSON.stringify({
          nbHits: 800,
          hits: [{
            objectID: '1005'
          }, {
            objectID: '1006'
          }]
        })
      );
    }

    function respondToDeleteObjects(req) {
      t.ok(index.deleteObjects.calledOnce, 'deleteObjects called');
      t.ok(
        index.deleteObjects.calledWith([
          '1005',
          '1006'
        ]),
        'deleteObjects called with good params'
      );

      fauxJax.once('request', respondToWaitTask);
      req.respond(
        200,
        {},
        JSON.stringify({
          taskID: 2934
        })
      );
    }

    function respondToWaitTask(req) {
      t.ok(index.waitTask.calledOnce, 'index waitTask called');
      t.ok(
        index.waitTask.calledWith(2934),
        'index waitTask called with good params'
      );

      fauxJax.once('request', respondToSecondSearch);
      req.respond(
        200,
        {},
        JSON.stringify({
          status: 'published'
        })
      );
    }

    function respondToSecondSearch(req) {
      // deleteByQuery called again
      t.ok(index.deleteByQuery.calledOnce, 'index deleteByQuery called');
      t.ok(
        index.deleteByQuery.calledWith('salmon'),
        'index deleteByQuery called with good params'
      );

      // search called again
      t.ok(index.search.calledOnce, 'index search called');
      t.ok(
        index.search.calledWith('salmon', {
          attributesToRetrieve: 'objectID',
          hitsPerPage: 1000,
          distinct: false
        }),
        'index search called with good params'
      );

      // add check that deleteObjects was not called

      // this answers to deleteObject since search was served from cache
      // AH! we should clear the cache after each loop
      // but why does it works after, mystery
      req.respond(
        200,
        {},
        JSON.stringify({
          nbHits: 0
        })
      );

      index.search.restore();
      index.deleteObjects.restore();
      index.waitTask.restore();
      index.deleteByQuery.restore();
    }
  });
}
