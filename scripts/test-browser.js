const execSync = require('child_process').execSync;

console.log('Browser test');

console.log('Browser test: build');
execSync('yarn build', {
  env: {
    NODE_ENV: 'production'
  }
});

if (process.argv[2] === 'unit') {
  console.log('Browser test: unit');
  execSync(
    'zuul --loopback localhostfix.nossl --sauce-connect --no-coverage -- test/run-browser.js',
    {
      env: {
        DEBUG: 'zuul*'
      }
    }
  );
}

if (process.argv[2] === 'integration') {
  console.log('Browser test: integration');
  execSync(
    'zuul --loopback localhostfix.nossl --sauce-connect --no-coverage -- test/run-integration.js',
    {
      env: {
        DEBUG: 'zuul*'
      }
    }
  );
}

