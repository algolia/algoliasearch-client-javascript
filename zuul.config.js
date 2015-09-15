'use strict';

var zuulConfig = module.exports = {
  ui: 'tape',
  browserify: [{
    transform: 'bulkify'
  }],
  scripts: [
    '/node_modules/jquery/dist/jquery.min.js',
    '/node_modules/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js',
    '/node_modules/angular/angular.min.js',
    // browser integration tests will use the dist file
    '/dist/algoliasearch.min.js'
  ],
  html: './test/template.html',
  server: './test/support-server/index.js',

  // only used when run with saucelabs
  // not activated when dev or phantom
  concurrency: 5,
  // if browser does not sends output in 30s since last output:
  // stop testing, something is wrong
  browser_output_timeout: 50 * 1000,
  // we want to be notified something is wrong asap, so no retry
  browser_retries: 0
};

if (process.env.TRAVIS_BUILD_NUMBER !== undefined) {
  zuulConfig.tunnel = {
    type: 'ngrok'
  };
}

var browsers = {
  all: [{
    name: 'chrome',
    version: '44..dev',
    platform: 'Windows 10'
  }, {
    name: 'firefox',
    version: '40..beta',
    platform: 'Windows 10'
  }, {
    name: 'internet explorer',
    version: '8..11'
  }, {
    name: 'safari',
    version: '6..latest'
  }, {
    name: 'iphone',
    version: '7.0..latest'
  }, {
    name: 'android',
    version: '4.1..latest'
  }, {
    name: 'ipad',
    version: '7.0..latest'
  }, {
    name: 'microsoftedge',
    version: 'latest'
  }],
  pullRequest: [{
    name: 'chrome',
    version: 'latest', // `latest` === stable
    platform: 'Windows 2012 R2'
  }, {
    name: 'internet explorer',
    version: '11'
  }, {
    name: 'firefox',
    version: 'latest',
    platform: 'Windows 2012 R2'
  }, {
    name: 'iphone',
    version: 'latest'
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
