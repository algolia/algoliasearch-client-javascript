# ways to import

## client

```js
import { initClient } from 'algoliasearch';

const client = initClient(appId, apiKey);

client. // any client method
client.requester. // clearIndex, headers, timeouts
```

## index

```js
import { initIndex } from 'algoliasearch';

const index = initIndex(appId, apiKey);

index // any index method
index.requester // clearIndex, headers, timeouts
```

## places

```js
import { initPlaces } from 'algoliasearch';

const index = initPlaces(appId, apiKey);

index.search(params);
index.getObject('objectId', params);
index.getObjects(['objectId'], params);
index.requester // clearIndex, headers, timeouts
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

# methods on index

# removed methods

All deprecated methods are removed

## client

- `ttAdapter`

## index

- `similarSearch` --> `search({similarQuery: 'bla' })`

# other changes

## Done

### Requester methods

#### options

- headers
- timeouts

These are available as a last argument on every method, and get applied to the `requester` call. 

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

  // or use waitTask implicitly (not implemented yet, )
  await index.addObject(obj, { sync: true });
  // something else
})();
```
