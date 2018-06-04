'use strict';

/* eslint new-cap: 0 */
module.exports = JSONPSyntaxError;

var express = require('express');

function JSONPSyntaxError() {
  var router = express.Router();
  var calls = {};

  router.get('/reset', function(req, res) {
    calls[req.headers['user-agent']] = 0;
    res.json({calls: calls[req.headers['user-agent']]});
  });

  router.get('/calls', function(req, res) {
    res.json({calls: calls[req.headers['user-agent']]});
  });

  router.get('/', function(req, res) {
    calls[req.headers['user-agent']]++;

    res.type('application/javascript');
    res.send('YAW! I THROW();');
  });

  return router;
}
