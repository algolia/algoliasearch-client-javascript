# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

# Release Notes

## [Unreleased](https://github.com/algolia/algoliasearch-client-javascript/compare/4.1.0...master)

### Added
- Improved `acl` property type in `GetApiKeyResponse` and `addApiKey` function param ([#1126](https://github.com/algolia/algoliasearch-client-javascript/pull/1126))
- Improved `AnalyticsClientOptions` property type region ([#1085](https://github.com/algolia/algoliasearch-client-javascript/pull/1085))
- Responses types can now be muted ([#1068](https://github.com/algolia/algoliasearch-client-javascript/pull/1068))

### Fixed
- Type `Log` ([#1139](https://github.com/algolia/algoliasearch-client-javascript/pull/1139))

## [v4.1.0](https://github.com/algolia/algoliasearch-client-javascript/compare/4.0.3...4.1.0)

### Added
- Field `filterPromotes` in Rule type ([#1013](https://github.com/algolia/algoliasearch-client-javascript/pull/1013))
- Method `hasPendingMappings` ([#1024](https://github.com/algolia/algoliasearch-client-javascript/pull/1024))

### Fixed
- Field `abtests` in GetAbTestsResponse type ([#1012](https://github.com/algolia/algoliasearch-client-javascript/pull/1012))
- `browse` related methods not bubbling up errors as expected ([#1042](https://github.com/algolia/algoliasearch-client-javascript/pull/1042))
- Header `x-algolia-user-id` is not allowed on browser env ([#1023](https://github.com/algolia/algoliasearch-client-javascript/pull/1023))

## [v4.0.3](https://github.com/algolia/algoliasearch-client-javascript/compare/4.0.2...4.0.3)

### Fixed
- `browseObjects` missing cursor error ([#1011](https://github.com/algolia/algoliasearch-client-javascript/pull/1011))
- `browseSynonyms|browseRules` giving just a maximum of 20 hits ([#1011](https://github.com/algolia/algoliasearch-client-javascript/pull/1011))
- Node entry point not es6 compliant ([#1005](https://github.com/algolia/algoliasearch-client-javascript/pull/1005))

## [v4.0.2](https://github.com/algolia/algoliasearch-client-javascript/compare/4.0.1...4.0.2)

### Fixed
- DOMException being thrown while instantiating browser local storage cache driver ([#999](https://github.com/algolia/algoliasearch-client-javascript/pull/999))

## [v4.0.1](https://github.com/algolia/algoliasearch-client-javascript/compare/4.0.0...4.0.1)

### Fixed
- Missing `repository` entry on `package.json` ([#989](https://github.com/algolia/algoliasearch-client-javascript/pull/989))

## [v4.0.0](https://github.com/algolia/algoliasearch-client-javascript/compare/3.35.1...4.0.0)

- Major version: [Upgrade Guide](https://www.algolia.com/doc/api-client/getting-started/upgrade-guides/javascript/)
