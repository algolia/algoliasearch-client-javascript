module.exports = slowJSONPResponse;

var express = require('express');

// test request timeout set to 50ms, we test that when responding
// after the timeout for the first request, we do not do a double callback
var requestTimeout = 100;

function slowJSONPResponse() {
  var router = express.Router();

  var calls = 0;
  var secondCallAnswered = false;

  router.get('/reset', function(req, res) {
    calls = 0;
    res.send('ok');
  });

  router.get('/', function(req, res) {
    calls++;

    if (calls === 1) {
      setTimeout(function tryAgain() {
        if (!secondCallAnswered) {
          console.log('try again');
          setTimeout(tryAgain, requestTimeout);
          return;
        }

        res.jsonp({slowJSONP: 'timeout response'});
        // request Timeout in slow JSONP response is 25 ms
      }, requestTimeout);
    } else if (calls === 2) {
      res.on('finish', function responseSent() {
        secondCallAnswered = true;
      });

      res.jsonp({slowJSONP: 'ok'});
    } else {
      res.sendStatus(500);
    }
  });

  return router;
}
