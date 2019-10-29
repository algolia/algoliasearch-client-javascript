import { createWaitablePromise, encode } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { mapRequestOptions } from '@algolia/transporter';
import { popRequestOption } from '@algolia/transporter/src/request-options';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { SaveSynonymsOptions } from '../../types/SaveSynonymsOptions';
import { SaveSynonymsResponse } from '../../types/SaveSynonymsResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { Synonym } from '../../types/Synonym';
import { HasWaitTask, waitTask } from './waitTask';

export const saveSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasSaveSynonyms => {
  return {
    ...waitTask(base),
    saveSynonyms(
      synonyms: readonly Synonym[],
      requestOptions?: SaveSynonymsOptions & RequestOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      const forward = popRequestOption(requestOptions, 'forwardToReplicas', undefined);
      const replace = popRequestOption(requestOptions, 'replaceExistingSynonyms', undefined);
      const options = mapRequestOptions(requestOptions);
      if (forward === true) {
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.forwardToReplicas = '1';
      }

      if (replace === true) {
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.replaceExistingSynonyms = '1';
      }

      return createWaitablePromise<SaveSynonymsResponse>(
        this.transporter.write<SaveSynonymsResponse>(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/synonyms/batch', this.indexName),
            data: synonyms,
          },
          options
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasSaveSynonyms = {
  readonly saveSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
