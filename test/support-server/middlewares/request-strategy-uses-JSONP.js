'use strict';

/* eslint new-cap: 0 */
module.exports = requestStrategyUsesJSONP;

const express = require('express');

function requestStrategyUsesJSONP() {
  const router = express.Router();
  let calls = 0;

  router.get('/reset', (req, res) => {
    calls = 0;
    res.send('ok');
  });

  router.get('/', (req, res) => {
    calls++;

    // only reply to the third JSONP request
    // 3 custom hosts, no dsn
    if (calls === 3) {
      res.jsonp({ hello: 'man' });
    } else {
      res.jsonp({ status: 500, message: 'woops!' });
    }
  });

  return router;
}
