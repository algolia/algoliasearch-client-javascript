import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { SaveSynonymsOptions } from '../../types';
import { saveSynonyms } from '.';

export const replaceAllSynonyms = (base: SearchIndex) => {
  return (
    synonyms: readonly Synonym[],
    requestOptions?: RequestOptions &
      Pick<
        SaveSynonymsOptions,
        Exclude<keyof SaveSynonymsOptions, 'clearExistingSynonyms' | 'replaceExistingSynonyms'>
      >
  ): Readonly<WaitablePromise<SaveSynonymsResponse>> => {
    return saveSynonyms(base)(synonyms, {
      ...requestOptions,
      clearExistingSynonyms: true,
    });
  };
};
