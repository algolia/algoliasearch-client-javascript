import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import {
  browseObjects,
  browseRules,
  browseSynonyms,
  exists,
  getSettings,
  saveObjects,
  saveRules,
  saveSynonyms,
  SearchIndex,
  setSettings,
} from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import { createDestinationIndiceExistsError, createIndicesInSameAppError } from '..';

export const accountCopyIndex = (
  source: SearchIndex,
  destination: SearchIndex,
  requestOptions?: RequestOptions
): WaitablePromise<void> => {
  // eslint-disable-next-line functional/prefer-readonly-type
  const responses: Array<WaitablePromise<any>> = [];

  const promise = exists(destination)()
    .then(res => {
      if (source.appId === destination.appId) {
        throw createIndicesInSameAppError(source.appId);
      }

      if (res) {
        throw createDestinationIndiceExistsError();
      }
    })
    .then(() => getSettings(source)())
    .then(settings =>
      // eslint-disable-next-line functional/immutable-data
      responses.push(setSettings(destination)(settings, requestOptions))
    )
    .then(() =>
      browseRules(source)({
        // eslint-disable-next-line functional/immutable-data
        batch: rules => responses.push(saveRules(destination)(rules, requestOptions)),
      })
    )
    .then(() =>
      browseSynonyms(source)({
        // eslint-disable-next-line functional/immutable-data
        batch: synonyms => responses.push(saveSynonyms(destination)(synonyms, requestOptions)),
      })
    )
    .then(() =>
      browseObjects(source)({
        // eslint-disable-next-line functional/immutable-data
        batch: objects => responses.push(saveObjects(destination)(objects, requestOptions)),
      })
    );

  return createWaitablePromise(
    /**
     * The original promise will return an array of async responses, now
     * we need to resolve that array of async responses using a
     * `Promise.all`, and then resolve `void` for the end-user.
     */
    promise.then(() => Promise.all(responses)).then(() => undefined),

    /**
     * Next, if the end-user calls the `wait` method, we need to also call
     * the `wait` method on each element of of async responses.
     */
    (_response, waitRequestOptions) => {
      return Promise.all(responses.map(response => response.wait(waitRequestOptions)));
    }
  );
};
