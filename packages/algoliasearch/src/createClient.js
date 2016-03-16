import partial from './partial.js';
import createRequester from './createRequester';

const defaultHosts = {read: [], write: []};

export default function createClient({
  requester,
  clientTimeouts,
  clientMethods,
  indexMethods,
  objectMethods,
  clientProtocol,
  clientHosts
}) {
  return function client({
    appId,
    apiKey,
    timeouts = clientTimeouts || {read: 2000, write: 20000},
    readProtocol = clientProtocol || 'https:',
    hosts = clientHosts || defaultHosts
  }) {
    const req = createRequester({
      appId,
      apiKey,
      timeouts,
      readProtocol,
      hosts: hosts === defaultHosts ? computeRegularHosts(appId) : hosts,
      requester
    });

    return {
      initIndex(indexName) {
        return {
          ...partial(indexMethods, req, indexName),
          objects: partial(objectMethods, req, indexName)
        };
      },
      ...partial(clientMethods, req)
    };
  };
}

function computeRegularHosts(appId) {
  const readWriteHosts = [
    `${appId}-1.algolianet.com`,
    `${appId}-2.algolianet.com`,
    `${appId}-3.algolianet.com`
  ];

  return {
    read: [`${appId}-dsn.algolia.net`, ...readWriteHosts],
    write: [`${appId}.algolia.net`, ...readWriteHosts]
  };
}
