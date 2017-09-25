// @flow

import { browse } from 'algoliasearch/methods/index/browse';
import createRequester from 'algoliasearch-requester';
import type {
  IndexName,
  AppId,
  ApiKey,
  RequestOptions,
  RequestMethod,
} from 'algoliasearch';

const throwIfAbsent = (name: string) => {
  throw new Error(`The parameter ${name} was missing, but it's required`);
};

const getInitialListeners = () => ({
  result: [],
  end: [],
  error: [],
});

export default function browseAll(
  params: SearchParameters = {},
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
  } = {}
) {
  let listeners = getInitialListeners();

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey });

  const emit = (type: $Keys<listeners>, data: any) => {
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
    on: (event: $Keys<listeners>, listener: any => void) =>
      listeners[event].push(listener),
    stop: () => {
      // stop the loop
      listeners = getInitialListeners();
    },
  };
}
