module.exports = slowResponse;

var express = require('express');

// test request timeout set to 2000ms, we test that when responding
// after the timeout for the first request, we do not do a double callback
var requestTimeout = 3000;

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
          setTimeout(tryAgain, requestTimeout);
          return;
        }

        respond({slowResponse: 'timeout response'});
      }, requestTimeout);
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
