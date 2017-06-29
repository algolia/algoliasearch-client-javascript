'use strict';

const bulkRequire = require('bulk-require');
const compression = require('compression');
const express = require('express');
const forEach = require('lodash-compat/collection/forEach');
const http = require('http');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(compression());

app.use(logger('dev'));

app.set('etag', false);

app.use(express.static(path.join(__dirname, '..', '..')));

app.use((req, res, next) => {
  res.set('Cache-Control', 'max-age=0, no-cache');
  res.set('Expires', new Date(0).toUTCString());

  next();
});

const middlewares = bulkRequire(path.join(__dirname, 'middlewares'), '*.js');

forEach(middlewares, (middleware, mountPoint) => {
  app.use(`/1/indexes/${mountPoint}`, middleware());
});

const server = http.createServer(app);

server.listen(process.env.ZUUL_PORT);
