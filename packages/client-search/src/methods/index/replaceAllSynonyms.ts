import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { saveSynonyms } from '.';

export const replaceAllSynonyms = (base: SearchIndex) => {
  return (
    synonyms: readonly Synonym[],
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<SaveSynonymsResponse>> => {
    return saveSynonyms(base)(synonyms, {
      ...(requestOptions === undefined ? {} : requestOptions),
      replaceExistingSynonyms: true,
    });
  };
};
