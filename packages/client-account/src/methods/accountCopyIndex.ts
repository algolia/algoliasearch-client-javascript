import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import {
  HasBrowseObjects,
  HasBrowseRules,
  HasBrowseSynonyms,
  HasExists,
  HasGetSettings,
  HasSaveObjects,
  HasSaveRules,
  HasSaveSynonyms,
  HasSetSettings,
  SearchIndex as BaseSearchIndex,
} from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import { createIndicesInSameAppError } from '..';
import { createDestinationIndiceExistsError } from '../errors/createDestinationIndiceExistsError';

type SourceSearchIndex = BaseSearchIndex &
  HasGetSettings &
  HasBrowseSynonyms &
  HasBrowseRules &
  HasBrowseObjects;

type DestinationSearchIndex = BaseSearchIndex &
  HasSetSettings &
  HasSaveSynonyms &
  HasSaveRules &
  HasSaveObjects &
  HasExists;

export const accountCopyIndex = (
  source: SourceSearchIndex,
  destination: DestinationSearchIndex,
  requestOptions: RequestOptions
): WaitablePromise<void> => {
  // eslint-disable-next-line functional/prefer-readonly-type
  const responses: Array<WaitablePromise<any>> = [];

  const promise = destination
    .exists()
    .then(exists => {
      if (source.appId === destination.appId) {
        throw createIndicesInSameAppError(source.appId);
      }

      if (exists) {
        throw createDestinationIndiceExistsError();
      }

      return;
    })
    .then(() => source.getSettings())
    // eslint-disable-next-line functional/immutable-data
    .then(settings => responses.push(destination.setSettings(settings, requestOptions)))
    .then(() =>
      source.browseRules({
        // eslint-disable-next-line functional/immutable-data
        batch: rules => responses.push(destination.saveRules(rules, requestOptions)),
      })
    )
    .then(() =>
      source.browseSynonyms({
        // eslint-disable-next-line functional/immutable-data
        batch: synonyms => responses.push(destination.saveSynonyms(synonyms, requestOptions)),
      })
    )
    .then(() =>
      source.browseObjects({
        // eslint-disable-next-line functional/immutable-data
        batch: objects => responses.push(destination.saveObjects(objects, requestOptions)),
      })
    )
    .then(() => Promise.resolve());

  return createWaitablePromise(promise).onWait(() =>
    Promise.all(responses.map(response => response.wait()))
  );
};
