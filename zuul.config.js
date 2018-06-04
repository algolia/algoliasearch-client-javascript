'use strict';


module.exports = {
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
  concurrency: process.env.ZUUL_CONCURRENCY || 4,
  // if browser does not sends output in 120s since last output:
  // stop testing, something is wrong
  browser_output_timeout: 60 * 3 * 1000,
  browser_open_timeout: 60 * 6 * 1000,
  // we want to be notified something is wrong asap, so low retry
  browser_retries: 2,
  tunnel: false,
  browsers: [{
    name: 'chrome',
    version: '-1..latest',
    platform: 'Windows 10'
  },
  {
    name: 'firefox',
    version: '-1..latest',
    platform: 'Windows 10'
  }, {
    name: 'internet explorer',
    version: ['10', '11']
  }, {
    name: 'safari',
    version: ['9', '10', '11']
  }, {
    name: 'iphone',
    version: ['9', '10', '11']
  }, {
    name: 'microsoftedge',
    version: '-1..latest'
  }]
};
