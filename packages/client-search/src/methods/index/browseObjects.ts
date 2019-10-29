import { encode } from '@algolia/client-common';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { createBrowsablePromise } from '../../createBrowsablePromise';
import { BrowseOptions } from '../../types/BrowseOptions';
import { BrowseResponse } from '../../types/BrowseResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { SearchOptions } from '../../types/SearchOptions';

export const browseObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBrowseObjects => {
  return {
    ...base,
    browseObjects<TObject extends object>(
      requestOptions?: SearchOptions & BrowseOptions<TObject> & RequestOptions
    ): Readonly<Promise<void>> {
      return createBrowsablePromise<TObject>({
        ...requestOptions,
        shouldStop: response => response.cursor === undefined,
        request: (data: object): Readonly<Promise<BrowseResponse<TObject>>> =>
          this.transporter.read(
            {
              method: Method.Post,
              path: encode('1/indexes/%s/browse', this.indexName),
              data,
            },
            requestOptions
          ),
      });
    },
  };
};

export type HasBrowseObjects = {
  readonly browseObjects: <TObject extends object>(
    requestOptions?: SearchOptions & BrowseOptions<TObject> & RequestOptions
  ) => Readonly<Promise<void>>;
};
