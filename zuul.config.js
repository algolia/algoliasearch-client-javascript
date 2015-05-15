var zuulConfig = {
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

  if (process.env.BROWSERS === 'desktop') {
    zuulConfig.browsers = {
      name: 'chrome',
      version: '41..dev',
      platform: 'Windows 2012 R2' // Force Win 8.1, more stable
    }, {
      name: 'firefox',
      version: '37..latest',
      platform: 'Windows 2012 R2' // Force Win 8.1, more stable
    }, {
      name: 'ie',
      version: '8..latest'
    }, {
      name: 'safari',
      version: '6..latest'
    };
  } else if (process.env.BROWSERS === 'mobile') {
    zuulConfig.browsers = {
      name: 'iphone',
      version: '7.0..latest'
    }, {
      name: 'android',
      version: '4.0.3..latest'
    }, {
      name: 'ipad',
      version: '7.0..latest'
    }
  }
}

module.exports = zuulConfig;
