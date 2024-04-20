import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

import {
  SaveSynonymResponse,
  saveSynonyms,
  SaveSynonymsOptions,
  SearchIndex,
  Synonym,
} from '../..';

export const saveSynonym = (base: SearchIndex) => {
  return (
    synonym: Synonym,
    requestOptions?: RequestOptions & SaveSynonymsOptions
  ): Readonly<WaitablePromise<SaveSynonymResponse>> => {
    return saveSynonyms(base)([synonym], requestOptions);
  };
};
