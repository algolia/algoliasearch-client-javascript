module.exports = requestStrategyUsesJSONP;

var express = require('express');

function requestStrategyUsesJSONP() {
  var router = express.Router();
  var calls = 0;

  router.get('/reset', function(req, res) {
    calls = 0;
    res.send('ok');
  });

  router.get('/', function(req, res) {
    calls++;

    // only reply to the fourth JSONP request
    if (calls === 4) {
      res.jsonp({hello: 'man'});
    } else {
      res.sendStatus(500);
    }
  });

  return router;
}
