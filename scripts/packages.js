/* eslint-disable import/no-commonjs, functional/immutable-data */
const fs = require('fs-extra');

module.exports = fs.readdirSync('packages').filter(f => fs.statSync(`packages/${f}`).isDirectory());
