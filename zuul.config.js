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

var browsers = {
  all: [{
    name: 'chrome',
    version: '-1..latest',
    platform: 'Windows 10'
  }, {
    name: 'firefox',
    version: '-1..latest',
    platform: 'Windows 10'
  }, {
    name: 'internet explorer',
    version: '9..10'
  }, {
    name: 'safari',
    version: '-3..latest'
  }, {
    name: 'iphone',
    version: '-3..latest'
  }, {
    name: 'android',
    version: '-3..latest'
  }, {
    name: 'ipad',
    version: '-3..latest'
  }, {
    name: 'microsoftedge',
    version: 'latest'
  }],
  pullRequest: [{
    name: 'chrome',
    version: 'latest',
    platform: 'Windows 10'
  }, {
    name: 'internet explorer',
    version: ['9']
  }, {
    name: 'firefox',
    version: 'latest',
    platform: 'Windows 10'
  }, {
    name: 'iphone',
    version: '9.0'
  }, {
    name: 'android',
    version: 'latest'
  }, {
    name: 'microsoftedge',
    version: 'latest'
  }]
};

zuulConfig.browsers = process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false' ?
  browsers.pullRequest :
  browsers.all;
