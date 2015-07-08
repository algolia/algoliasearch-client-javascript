'use strict';

/* eslint new-cap: 0 */
module.exports = slowResponse;

var express = require('express');

// test request timeout set to 5000ms, we test that when responding
// after the timeout for the first request, we do not do a double callback
var respondAfter = 7000;

function slowResponse() {
  var router = express.Router();

  var calls = 0;
  var secondCallAnswered = false;

  router.get('/reset', function(req, res) {
    calls = 0;
    res.send('ok');
  });

  router.get('/', function(req, res) {
    calls++;

    var respond = res[req.query.callback !== undefined ? 'jsonp' : 'json'].bind(res);

    if (calls === 1) {
      setTimeout(function tryAgain() {
        if (!secondCallAnswered) {
          setTimeout(tryAgain, respondAfter);
          return;
        }

        respond({slowResponse: 'timeout response'});
      }, respondAfter);
    } else if (calls === 2) {
      res.on('finish', function responseSent() {
        secondCallAnswered = true;
      });

      respond({slowResponse: 'ok'});
    } else {
      respond({status: 500, message: 'woops!'});
    }
  });

  return router;
}
