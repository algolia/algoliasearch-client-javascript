'use strict';

/* eslint new-cap: 0 */
module.exports = blackhole;

const express = require('express');

function blackhole() {
  const router = express.Router();

  router.get('/', () => {});

  return router;
}
