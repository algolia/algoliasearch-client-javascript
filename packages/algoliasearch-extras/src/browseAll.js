// @flow
// todo: don't mention src
// eslint-disable-next-line monorepo/no-internal-import
import browse from 'algoliasearch/src/methods/index/browse';
import createRequester from 'algoliasearch-requester';
import { AlgoliaError } from 'algoliasearch-errors';
import type { IndexName, AppId, ApiKey, BrowseParameters } from 'algoliasearch';
import type { RequestOptions, RequestMethod } from 'algoliasearch-requester';

const throwIfAbsent = (name: string) => {
  throw new AlgoliaError(
    `The parameter ${name} was missing, but it's required`
  );
};

const getInitialListeners = () => ({
  result: [],
  end: [],
  error: [],
});

export default function browseAll(
  params: ?BrowseParameters = {},
  {
    indexName = throwIfAbsent('indexName'),
    appId = throwIfAbsent('appId'),
    apiKey = throwIfAbsent('apiKey'),
    requestOptions,
    requester: extraRequester,
  }: {
    indexName: IndexName,
    appId: AppId,
    apiKey: ApiKey,
    requestOptions?: RequestOptions,
    requester?: RequestMethod,
  }
) {
  let listeners = getInitialListeners();

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey });

  const emit = (type: $Keys<typeof listeners>, data: any) => {
    listeners[type].forEach(fn => fn(data));
  };

  const _browse = (_cursor?: string) =>
    browse(
      { ...params, cursor: _cursor },
      { indexName, requestOptions, requester }
    )
      .then(({ cursor, ...res }) => {
        if (cursor) {
          _browse(cursor);
          emit('result', res);
          listeners = getInitialListeners();
        }
        emit('result', res);
        emit('end');
        listeners = getInitialListeners();
      })
      .catch(err => {
        emit('error', err);
        listeners = getInitialListeners();
      });

  return {
    on: (event: $Keys<typeof listeners>, listener: any => void) =>
      listeners[event].push(listener),
    stop: () => {
      // stop the loop
      listeners = getInitialListeners();
    },
  };
}
