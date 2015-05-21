var zuulConfig = module.exports = {
  ui: 'tape',
  scripts: [
    '/node_modules/jquery/dist/jquery.min.js',
    '/node_modules/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js',
    '/node_modules/angular/angular.min.js'
  ],
  html: './test/template.html',
  server: './test/support-server/index.js',
  browserify: [{
    transform: 'bulkify'
  }]
};

if (process.env.BROWSERS) {
  // we are going to test against cloud browsers, use ngrok tunneling
  // default zuul is to use localtunnel.me, not reliable enough
  zuulConfig.tunnel = 'ngrok';
}

if (
  // For PRS or integration tests, no matter desktop or mobile, we test a subset of browsers
  // process.env.TRAVIS_PULL_REQUEST contains the PR# or false
  process.env.BROWSERS === 'integration' ||
  process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false') {
  zuulConfig.browsers = [{
    name: 'chrome',
    version: 'latest',
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
} else if (process.env.BROWSERS === 'desktop') {
  zuulConfig.browsers = [{
    name: 'chrome',
    version: '41..dev',
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
  }];
} else if (process.env.BROWSERS === 'mobile') {
  zuulConfig.browsers = [{
    name: 'iphone',
    version: '7.0..latest'
  }, {
    name: 'android',
    version: '4.0..latest'
  }, {
    name: 'ipad',
    version: '7.0..latest'
  }];
}
