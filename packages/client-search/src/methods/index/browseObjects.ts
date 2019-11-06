import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  SearchIndex,
  SearchOptions,
} from '../..';

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
              method: MethodEnum.Post,
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
