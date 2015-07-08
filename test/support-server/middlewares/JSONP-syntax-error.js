'use strict';

/* eslint new-cap: 0 */
module.exports = JSONPSyntaxError;

var express = require('express');

function JSONPSyntaxError() {
  var router = express.Router();
  var calls = 0;

  router.get('/reset', function(req, res) {
    calls = 0;
    res.json({calls: calls});
  });

  router.get('/calls', function(req, res) {
    res.json({calls: calls});
  });

  router.get('/', function(req, res) {
    calls++;

    res.type('application/javascript');
    res.send('YAW! I THROW();');
  });

  return router;
}
