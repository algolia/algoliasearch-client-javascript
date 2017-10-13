# algoliasearch-requester

This is the retry logic and http module used by Algolia. You can use this module standalone, or better in combination with any of the methods in `algoliasearch/methods`, which will have the correct endpoint for the methods already.

Technically you could use this package to do requests to another service than Algolia, but unless the retry strategy is the same as ours, you'll only have a use with the http layers. If you're having an idea for a different API client using this logic or client, don't hesitate to get in touch!

## Usage

```js
import createRequester from 'algoliasearch-requester';
import nodeHttpRequester from 'algoliasearch-requester/http/node';

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
    extraHosts: {
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
