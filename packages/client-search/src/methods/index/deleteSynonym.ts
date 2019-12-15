import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { DeleteResponse, DeleteSynonymOptions, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteSynonym = (base: SearchIndex) => {
  return (
    objectID: string,
    requestOptions?: DeleteSynonymOptions & RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    const options = mapRequestOptions(requestOptions);
    const forward = popRequestOption(requestOptions, 'forwardToReplicas');
    if (forward === true) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.forwardToReplicas = '1';
    }

    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('1/indexes/%s/synonyms/%s', base.indexName, objectID),
        },
        options
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
