'use strict';

var zuulConfig = module.exports = {
  ui: 'tape',
  browserify: [{
    transform: 'bulkify'
  }],
  scripts: [
    '/node_modules/jquery/dist/jquery.min.js',
    '/node_modules/jquery-ajax-transport-xdomainrequest/jquery.xdomainrequest.min.js',
    '/node_modules/angular/angular.min.js',
    // browser integration tests will use the dist file
    '/dist/algoliasearch.min.js'
  ],
  html: './test/template.html',
  server: './test/support-server/index.js',

  // only used when run with saucelabs
  // not activated when dev or phantom
  concurrency: 1, // ngrok only accepts two tunnels by default
  // if browser does not sends output in 120s since last output:
  // stop testing, something is wrong
  browser_output_timeout: 60 * 3 * 1000,
  browser_open_timeout: 60 * 6 * 1000,
  // we want to be notified something is wrong asap, so no retry
  browser_retries: 1
};

if (process.env.CI === 'true') {
  zuulConfig.tunnel = {
    type: 'ngrok',
    bind_tls: true
  };
}

var browsers = require('browzers');

zuulConfig.browsers = process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false' ?
  browsers.pullRequest :
  browsers.all;
