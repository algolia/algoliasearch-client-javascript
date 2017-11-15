# Release
- [ ] build script
- [ ] publish script
- [ ] publish typings
  - [ ] flow
  - [ ] typescript
- [ ] make sure `/latest` uses v3 on jsDelivr and have patch updates
- [ ] migration guide
- [ ] blog post

# Code
- [ ] browse / export extras
  - iterator-ish
  - `const b = new IndexBrowser(); b.next(1000);` (could do multiple api calls)
  - `const s = new SynonymBrowser();`
  - `const r = new RuleBrowser();`
  - replace `browseAll`, `exportRules`, `exportSynonyms`
- [x] implement stateful request strategy based on the spec
  - `createRequester`
  - after 20 mins the timeout is back to default
  - after 2 mins the first host is tried again
  - [x] host index sharing
  - [x] host index invalidation
  - [x] change host upon timeout
  - [x] timeout sharing
  - [x] timeout invalidation
- [ ] http
  - [ ] parse requestOptions at the http layer
  - [ ] layers
    - [ ] node
    - [ ] XHR
    - [ ] fetch (can be done later)
    - [ ] remove angular (can be done later)
    - [ ] remove jQuery (can be done never)
- [x] caching
- [x] method signatures
  - [x] change attachParameters to only attach second
- [x] implement all API methods
- [x] import default deprecation
  - `import algoliasearch from 'algoliasearch'; algoliasearch(); // logs explanation`
  - [ ] tested in all bundlers and situations
  - [ ] strip it out mostly in prod

# Tests
- [ ] ensure it works in different flavours
  - [ ] React Native
  - [ ] Angular
- [ ] integration tests
- [ ] caching
- [ ] Fix Flow edgecases
