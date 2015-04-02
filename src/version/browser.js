// This is the `packageify` transform: https://github.com/auth0/packageify
// It allows selecting only some properties of the package.json without including it all in the build
// like `require('./package.json').version` would
module.exports = require('package.version');
