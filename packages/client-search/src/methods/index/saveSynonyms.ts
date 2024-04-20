import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@sefai/transporter';

import { SaveSynonymsOptions, SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { waitTask } from '.';

export const saveSynonyms = (base: SearchIndex) => {
  return (
    synonyms: readonly Synonym[],
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ): Readonly<WaitablePromise<SaveSynonymsResponse>> => {
    const { forwardToReplicas, clearExistingSynonyms, replaceExistingSynonyms, ...options } =
      requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);

    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
    }

    if (replaceExistingSynonyms || clearExistingSynonyms) {
      mappedRequestOptions.queryParameters.replaceExistingSynonyms = 1; // eslint-disable-line functional/immutable-data
    }

    return createWaitablePromise<SaveSynonymsResponse>(
      base.transporter.write<SaveSynonymsResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/synonyms/batch', base.indexName),
          data: synonyms,
        },
        mappedRequestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
