# Release

* [ ] build script
  * [ ] preamble (`/*! copyright ...*/`)
* [ ] publish script
* [ ] publish typings
  * [ ] flow
  * [ ] typescript
* [ ] Ensure `/latest` users won't get V4 on jsDelivr (Ask them to stop updating <http://cdn.jsdelivr.net/algoliasearch/latest>)
* [ ] migration guide
* [ ] blog post

# Code

* [ ] browse / export extras
  * iterator-ish
  * `const b = new IndexBrowser(); b.next(1000);` (could do multiple api calls)
  * `const s = new SynonymBrowser();`
  * `const r = new RuleBrowser();`
  * replace `browseAll`, `exportRules`, `exportSynonyms`
* [x] implement stateful request strategy based on the spec
  * `createRequester`
  * after 20 mins the timeout is back to default
  * after 12 seconds the first host is tried again
  * [x] host index sharing
  * [x] host index invalidation
  * [x] change host upon timeout
  * [x] timeout sharing
  * [x] timeout invalidation
  * [ ] randomise fallback host (indices)
* [ ] http
  * [ ] parse requestOptions at the http layer
  * [ ] layers
    * [ ] node
    * [ ] XHR
    * [ ] fetch (for service workers)
* [x] caching
* [x] method signatures
  * [x] change attachParameters to only attach second
* [x] implement all API methods
* [x] import default deprecation
  * `import algoliasearch from 'algoliasearch'; algoliasearch(); // logs explanation`
  * [ ] tested in all bundlers and situations
  * [ ] strip it out mostly in prod
* [ ] use `AlgoliaRequesterError` for retry strategy
* [ ] MCM methods

# Tests

* [ ] ensure it works in different flavours
  * [ ] React Native
  * [ ] Angular
* [ ] integration tests
* [ ] caching
* [ ] Fix Flow edgecases

# Environment support

* [ ] service workers
* [ ] angular plugin
* [ ] proxy support (HTTP_PROXY HTTPS_PROXY=https://user:password@ip.ip.ip.ip env variables)
* [ ] evergreen browser support
* [ ] maybe polyfills for IE11
