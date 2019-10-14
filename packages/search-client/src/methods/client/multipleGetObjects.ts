import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchClient } from '../../SearchClient';
import { MultipleGetObject } from '../types/MultipleGetObject';
import { MultipleGetObjectsResponse } from '../types/MultipleGetObjectsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const multipleGetObjects = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasMultipleGetObjects {
    public multipleGetObjects<TObject>(
      requests: readonly MultipleGetObject[],
      requestOptions?: RequestOptions
    ): Promise<MultipleGetObjectsResponse<TObject>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/*/objects`,
          data: {
            requests,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasMultipleGetObjects = {
  readonly multipleGetObjects: <TObject>(
    requests: readonly MultipleGetObject[],
    requestOptions?: RequestOptions
  ) => Promise<MultipleGetObjectsResponse<TObject>>;
};
