# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

# Release Notes

## [UNRELEASED](https://github.com/algolia/algoliasearch-client-javascript/compare/4.3.0...master)

## [v4.3.0](https://github.com/algolia/algoliasearch-client-javascript/compare/4.2.0...4.3.0)

## Added

- `naturalLanguages` option type ([#1147](https://github.com/algolia/algoliasearch-client-javascript/pull/1147))
- `shouldStop` option to stop browse ([#1029](https://github.com/algolia/algoliasearch-client-javascript/pull/1029))
- `inner_queries` property to `getLogs` response ([#1109](https://github.com/algolia/algoliasearch-client-javascript/pull/1109), [#1166](https://github.com/algolia/algoliasearch-client-javascript/pull/1166))
- `enablePersonalization` option to type `Settings` ([#1151](https://github.com/algolia/algoliasearch-client-javascript/pull/1151))

## Fixed

- additional `clear`, `delete` & `deleteObject` types for the `.batch` method ([#1149](https://github.com/algolia/algoliasearch-client-javascript/pull/1149))
- unhandled promise issue while using while using `accountCopyIndex` ([#1154](https://github.com/algolia/algoliasearch-client-javascript/pull/1154))
- node requester unicode characters being corrupted on large responses ([#1164](https://github.com/algolia/algoliasearch-client-javascript/pull/1164))

## [v4.2.0](https://github.com/algolia/algoliasearch-client-javascript/compare/4.1.0...4.2.0)

### Added
- Improved `acl` property type in `GetApiKeyResponse` and `addApiKey` function param ([#1126](https://github.com/algolia/algoliasearch-client-javascript/pull/1126))
- Improved `AnalyticsClientOptions` property type region ([#1085](https://github.com/algolia/algoliasearch-client-javascript/pull/1085))
- Responses types can now be mutated ([#1068](https://github.com/algolia/algoliasearch-client-javascript/pull/1068))

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
