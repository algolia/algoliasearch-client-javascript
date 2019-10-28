import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { MultipleGetObject } from '../types/MultipleGetObject';
import { MultipleGetObjectsResponse } from '../types/MultipleGetObjectsResponse';

export const multipleGetObjects = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasMultipleGetObjects => {
  return {
    ...base,
    multipleGetObjects<TObject>(
      requests: readonly MultipleGetObject[],
      requestOptions?: RequestOptions
    ): Readonly<Promise<MultipleGetObjectsResponse<TObject>>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: '1/indexes/*/objects',
          data: {
            requests,
          },
        },
        requestOptions
      );
    },
  };
};

export type HasMultipleGetObjects = {
  readonly multipleGetObjects: <TObject>(
    requests: readonly MultipleGetObject[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleGetObjectsResponse<TObject>>>;
};
