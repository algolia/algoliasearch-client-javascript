# Algoliasearch extras

This package contains parts of the Algolia client that you can use to save time. These used to be part of `algoliasearch` itself, but now are their own package. These packages depend on the most same version of the `algoliasearch` client as this version.

# Contents

## `browseAll`

```js
import { browseAll } from 'algoliasearch-extras';

const browser = browseAll(
  {
    // any search parameter, like:
    query: 'something',
    filters: 'color:blue',
    // etc
  },
  {
    indexName: 'your-index-name',
    apiKey: 'XXX', // browse api key
    requestOptions, // todo: add link to requestOptions here
    requester, // todo: add link to requester here
  }
);

const hits = [];

browser.on('result', function onResult(content) {
  hits = hits.concat(content.hits);
});

browser.on('end', function onEnd() {
  console.log('Finished!');
  console.log(`We got ${hits.length} hits`);
});

browser.on('error', function onError(err) {
  throw err;
});

// You can stop the process at any point with
// browser.stop();
```

## `deleteByQuery`

```js
import { deleteByQuery } from 'algoliasearch-extras';

deleteByQuery(
  {
    // any search parameter, like:
    query: 'something',
    filters: 'color:blue',
    // etc
  },
  {
    indexName: 'your-index-name',
    apiKey: 'XXX', // admin api key
    requestOptions, // todo: add link to requestOptions here
    requester, // todo: add link to requester here
  }
).catch(err => console.log(err));
```
