import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { SaveSynonymsOptions, SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { waitTask } from '.';

export const saveSynonyms = (base: SearchIndex) => {
  return (
    synonyms: readonly Synonym[],
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ): Readonly<WaitablePromise<SaveSynonymsResponse>> => {
    const forward = popRequestOption(requestOptions, 'forwardToReplicas', undefined);
    const replace = popRequestOption(requestOptions, 'replaceExistingSynonyms', undefined);
    const options = mapRequestOptions(requestOptions);
    if (forward === true) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.forwardToReplicas = '1';
    }

    if (replace === true) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.replaceExistingSynonyms = '1';
    }

    return createWaitablePromise<SaveSynonymsResponse>(
      base.transporter.write<SaveSynonymsResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/synonyms/batch', base.indexName),
          data: synonyms,
        },
        options
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
