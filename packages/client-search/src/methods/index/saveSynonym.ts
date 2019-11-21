import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsOptions, SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { saveSynonyms } from '.';

export const saveSynonym = (base: SearchIndex) => {
  return (
    synonym: Synonym,
    requestOptions?: RequestOptions & SaveSynonymsOptions
  ): Readonly<WaitablePromise<SaveSynonymsResponse>> => {
    return saveSynonyms(base)([synonym], requestOptions);
  };
};
