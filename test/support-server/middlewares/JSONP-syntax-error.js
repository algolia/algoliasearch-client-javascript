'use strict';

/* eslint new-cap: 0 */
module.exports = JSONPSyntaxError;

const express = require('express');

function JSONPSyntaxError() {
  const router = express.Router();
  let calls = 0;

  router.get('/reset', (req, res) => {
    calls = 0;
    res.json({ calls });
  });

  router.get('/calls', (req, res) => {
    res.json({ calls });
  });

  router.get('/', (req, res) => {
    calls++;

    res.type('application/javascript');
    res.send('YAW! I THROW();');
  });

  return router;
}
