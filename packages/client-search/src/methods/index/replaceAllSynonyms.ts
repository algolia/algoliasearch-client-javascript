import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

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
