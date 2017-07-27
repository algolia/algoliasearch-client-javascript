# V4 API working document

# ways to import

## client

```js
import { initClient } from 'algoliasearch';

const client = initClient(appId, apiKey);

client. // any client method
client.requester. // clearCache, headers, timeouts
```

## index

```js
import { initIndex } from 'algoliasearch';

const index = initIndex(appId, apiKey);

index // any index method
index.requester // clearCache, headers, timeouts
```

## places

```js
import { initPlaces } from 'algoliasearch';

const places = initPlaces(appId, apiKey);

places.search(params);
places.getPlace('objectId', params);
places.getPlaces(['objectId'], params);
places.requester // clearIndex, headers, timeouts
```

## individual methods

```js
import { search } from 'algoliasearch/methods/index';
import { clearIndex } from 'algoliasearch/methods/client';
import { createRequester } from 'algoliasearch/requester'; // maaaybe this will be algoliasearch-requester

const requester = createRequester(opts); // timeouts, headers etc.

search(requester, { query: 'atlenta' })
  .then(result => console.log(result))

(async () => {
  const { hits } = await search(
    requester,
    'cities-us',
    { query: 'atlenta' },
    { timeouts: {} }
  );
})();

clearIndex(requester, 'cities-us');
```

# methods on client

- `addApiKey`
- `batch`
- `clearIndex`
- `copyIndex`
- `deleteApiKey`
- `deleteIndex`
- `getApiKey`
- `getLogs`
- `initIndex`
- `listApiKeys`
- `listIndexes`
- `moveIndex`
- `search` ➡️ only expose one signature with SearchParams
- `updateApiKey`

# methods on index

- `addApiKey`
- `addObject`
- `addObjects`
- `batch`
- `batchRules`
- `batchSynonyms`
- `browse`
- `browseFrom`
- `clearRules`
- `clearSynonyms`
- `deleteApiKey`
- `deleteObject`
- `deleteObjects`
- `deleteRule`
- `deleteSynonym`
- `getApiKey`
- `getObject`
- `getObjects`
- `getRule`
- `getSettings`
- `getSynonym`
- `listApiKeys`
- `partialUpdateObject`
- `partialUpdateObjects`
- `saveObject`
- `saveObjects`
- `saveRule`
- `saveSynonym`
- `search`
- `searchForFacetValues`
- `searchRules`
- `searchSynonyms`
- `setSettings`
- `updateApiKey`

# removed methods

All deprecated methods are removed

## client

- `ttAdapter`
- `destroy` ➡️ node nowadays handles that cleanly
- `addAlgoliaAgent` ➡️ just use `headers`
- `initIndex` ➡️ just import it
- `setSecurityTags` ➡️ unused
- `setExtraHeader` ➡️ handled via requestOptions
- `getExtraHeader` ➡️ handled via requestOptions
- `unsetExtraHeader` ➡️ handled via requestOptions
- `setTimeouts` ➡️ handled via requestOptions
- `setRequestTimeout` ➡️ handled via requestOptions
- `getTimeouts` ➡️ handled via requestOptions
- `disableRateLimitForward` ➡️ handled via requestOptions
- `disableSecuredAPIKey` ➡️ handled via requestOptions
- `enableRateLimitForward` ➡️ handled via requestOptions
- `useSecuredAPIKey` ➡️ handled via requestOptions

## index

- `similarSearch` ➡️ `search({similarQuery: 'bla' })`
- `browseAll` ➡️ separate package
- `deleteByQuery` ➡️ separate package (maybe API feature?)

# other changes

- `generateSecuredApiKey` ➡️ no longer a client method, but a main import
- `waitTask` ➡️ no longer an index method, but a main import
- `initClient` etc. expose a `requester` for methods like `clearCache`

## Done

### Requester methods

#### options

- headers
- timeouts

These are available as a last argument on every method, and get applied to the `requester` call. 

The header `x-algolia-agent` gets a special case, because it will be merged with the existing `Algolia for JavaScript (version)` header.

The `extraHeaders` and `extraQueryStrings` are available for cases where we have a parameter that isn't documented. For parameters that are known (like `forwardToReplicas` or `forwardedFor`) we decide ourselves to send it as header or query string. 

> see also [the spec](https://docs.google.com/document/d/1LnObLB5jUQcXzTzgRqbYkqtczoQP4mRQz0X01oY3I5o/edit#)

##### To consider

These options are also available statefully (?), for options that are relevant for every request:

```js
requester.setOptions(current => newOptions)
```

This leaves the responsibility of merging the state up to the implementer, to stay more flexible 

> see `setState` with a function in React

#### cache

How to clear cache in RIS and IS.js

```js
import { createRequester } from 'algoliasearch/requester'; // maaaybe this will be algoliasearch-requester
const requester = createRequester();

search(requester, requests);
searchForFacetValues(requester, query);

requester.clearCache();

const App = () => <InstantSearch requester={requester} />;
```

Cache will be enabled by default

> how to disable it? 

## to consider

### Synchronous indexing operations

```js
(async () => {
  // either manually await the task (with Promises)
  index
    .addObject(obj)
    .then(({ taskId }) => index.waitTask(taskId))
    .then(console.log('do whatever'));

  // or with async/await
  const { taskId } = await index.addObject(obj);
  await index.waitTask(taskId);
  // something else

  // or use waitTask implicitly (not implemented yet)
  await index.addObject(obj, { sync: true });
  // something else
})();
```
