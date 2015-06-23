var zuulConfig = module.exports = {
  ui: 'tape',
  browserify: [{
    transform: 'bulkify'
  }],
  concurrency: 5
};

if (process.env.BROWSERS === 'integration') {
  zuulConfig.scripts = [
    // browser integration tests will use the dist files
    '/dist/algoliasearch.min.js'
  ];
} else {
  zuulConfig.scripts = [
    '/node_modules/jquery/dist/jquery.min.js',
    '/node_modules/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js',
    '/node_modules/angular/angular.min.js',
    // browser integration tests will use the dist files
    '/dist/algoliasearch.min.js'
  ];
  zuulConfig.html = './test/template.html';
  zuulConfig.server = './test/support-server/index.js';
}

var browsers = {
  // process.env.BROWSERS = 'desktop';
  desktop: [{
    name: 'chrome',
    version: '42..beta',
    platform: 'Windows 2012 R2'
  }, {
    name: 'firefox',
    version: '37..latest',
    platform: 'Windows 2012 R2'
  }, {
    name: 'ie',
    version: '8..latest'
  }, {
    name: 'safari',
    version: '6..latest'
  }],
  // process.env.BROWSERS = 'mobile';
  mobile: [{
    name: 'iphone',
    version: '7.0..latest'
  }, {
    name: 'android',
    version: '4.1..latest'
  }, {
    name: 'ipad',
    version: '7.0..latest'
  }]
};

// process.env.BROWSERS = 'integration';
// integration tests are taking less time to complete, can be run
// on all devices
browsers.integration = browsers.desktop.concat(browsers.mobile);

// For PRS, no matter desktop or mobile, we test a subset of browsers
browsers.pr = [{
  name: 'chrome',
  version: 'latest', // `latest` === stable
  platform: 'Windows 2012 R2' // Force Win 8.1, more stable
}, {
  name: 'ie',
  version: 'latest'
}, {
  name: 'firefox',
  version: 'latest',
  platform: 'Windows 2012 R2'
}, {
  name: 'safari',
  version: 'latest'
}, {
  name: 'iphone',
  version: 'latest'
}, {
  name: 'ipad',
  version: 'latest'
}, {
  name: 'android',
  version: 'latest'
}];

if (process.env.BROWSERS) {
  // we are going to test against cloud browsers, use ngrok tunneling
  // default zuul is to use localtunnel.me, not reliable enough
  zuulConfig.tunnel = 'ngrok';
}

  // TRAVIS_PULL_REQUEST contains either false or the travis job #
if (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false') {
  zuulConfig.browsers = browsers.pr;
} else if (process.env.BROWSERS) {
  zuulConfig.browsers = browsers[process.env.BROWSERS];
}
