# algoliasearch-requester

This is the retry logic and http module used by Algolia. You can use this module
standalone, or better in combination with any of the methods in
`algoliasearch/methods`, which will have the correct endpoint for the methods
already.

Technically you could use this package to do requests to another service than
Algolia, but unless the retry strategy is the same as ours, you'll only have a
use with the http layers. If you're having an idea for a different API client
using this logic or client, don't hesitate to get in touch!

## Usage

```js
import createRequester from 'algoliasearch-requester';
import nodeHttpRequester from 'algoliasearch-requester-node';

const requester = createRequester({
  appId: 'your-app-id', // required
  apiKey: 'your-api-key',
  httpRequester: nodeHttpRequester,
  options: {
    timeouts: {
      connect: 1000, // ms
      read: 2000,
      write: 30000,
    },
    hosts: {
      read: ['https://extra-reading-server.com'],
      write: ['https://extra-writing-server.com'],
    },
    cache: false,
  },
  requestOptions: {
    // any request option
  },
});

const indexName = 'my-index';

requester({
  method: 'POST',
  path: `/1/indexes/${indexName}/query`,
  body: { query: 'nice' },
  qs: { whatever: true },
  requestOptions: { forwardToReplicas: true },
  requestType: 'read',
})
  .then(console.log)
  .catch(console.warn);
```

# Writing your own `httpRequester`

To make it possible to split off the request strategy there are two parts that are responsible for making API calls to Algolia. 

1. `createRequester`: caching, request strategy and knowing which path to request
2. `httpRequester`: promise-based wrapper over your environments preferred way of doing a http request

The `httpRequester` is injected in the constructor of a requester, and is only an internal API. If for some reason you can't polyfill the underlying API of fetch, xhr or node, you can create a new `httpRequester`.

### Type

`httpRequester` is a pure function.

### arguments

It receives a single object as arguments. This is what you should use to make your request

#### body

The body of the request (`POST`). A plain object

#### method

The http method to use (`POST`, `GET`, `DELETE` ...)

#### url

The URL to request. a [WHATWG `URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) object (also available in [node](https://nodejs.org/api/url.html)).
#### timeout

Amount of `ms` to wait for a request before aborting it completely and rejecting with `{ reason: 'timeout' }`

#### connectTimeout

If possible in your environment: Amount of `ms` to wait before any data has been returned before aborting it completely and rejecting with `{ reason: 'timeout' }`.

#### requestOptions

Object with parameters that can be added as query string or headers.

TODO: figure out to send headers or url parameters, which format should be used.

### returns

A promise that will `resolve` with the results of the Algolia API without modifying them on `200` as status. All other cases will `reject` with an object as argument (not an `Error`, because we can only access a string then, which isn't useful in retry strategy).

### `resolve`

If `status / 100 === 2`, you `resolve` the promise with the results from the API call without modifying.

#### `reject({ reason: 'timeout' })` (retries)

When either the `connectTimeout` has been reached before any data was retrieved, or the `timeout` has been reached before the data has been retrieved correctly, you should `reject` with `{ reason: 'timeout' }`.

The API client will then retry the same request on a different host, with an increased timeout.

### `reject({ reason: 'client' })` (doesn't retry)

If `Math.floor(status / 100) === 4` (so if the code is 4XX), there is something wrong with the request done, and it doesn't need to be retried. 

The API client will throw this as an error and not retry the request.

### `reject({ reason: 'server' })` (retries)

If `Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 2` (so if the code is any other than 2XX and 4XX), there is something wrong with the server you're trying. 

#### `reject({ reason: 'network' })` (retries)

If the network failed for some reason, for example if the device is offline or because dns couldn't be resolved, you `reject` with `{ reason: 'network' }` and with all other available data from your host environment also in that object (make sure you don't accidentally overwrite the `reason` key).

The API client will then retry the same request on a different host.

#### `reject({ reason 'fatal' })` (doesn't retry)

There should normally be no other cases to handle as `httpRequester`. As a last resort when things go really bad, you can also reject with `{ reason: 'fatal' }`

The API client will throw this as an error and not retry the request.
