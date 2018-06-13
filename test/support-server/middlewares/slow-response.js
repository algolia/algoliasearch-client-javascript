'use strict';

/* eslint new-cap: 0 */
module.exports = slowResponse;

var express = require('express');

// test request timeout set to 5000ms, we test that when responding
// after the timeout for the first request, we do not do a double callback
var respondAfter = 6000;

function slowResponse() {
  var router = express.Router();

  var calls = {};
  var secondCallAnswered = {};

  router.get('/reset', function(req, res) {
    calls[req.headers['user-agent']] = 0;
    res.send('ok');
  });

  router.get('/', function(req, res) {
    calls[req.headers['user-agent']]++;

    var respond = res[req.query.callback !== undefined ? 'jsonp' : 'json'].bind(res);

    if (calls[req.headers['user-agent']] === 1) {
      setTimeout(function tryAgain() {
        if (!secondCallAnswered[req.headers['user-agent']]) {
          setTimeout(tryAgain, respondAfter);
          return;
        }

        respond({status: 200, slowResponse: 'timeout response'});
      }, respondAfter);
    } else if (calls[req.headers['user-agent']] === 2) {
      res.on('finish', function responseSent() {
        secondCallAnswered[req.headers['user-agent']] = true;
      });

      respond({status: 200, slowResponse: 'ok'});
    } else {
      respond({status: 500, message: 'woops!'});
    }
  });

  return router;
}
