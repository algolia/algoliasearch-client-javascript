import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { BrowsablePromise } from '../../BrowsablePromise';
import { SearchIndex } from '../../SearchIndex';
import { BrowseOptions } from '../types/BrowseOptions';
import { BrowseResponse } from '../types/BrowseResponse';
import { SearchOptions } from '../types/SearchOptions';

export const browseObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBrowseObjects => {
  return {
    ...base,
    browseObjects<TObject extends object>(
      requestOptions?: SearchOptions & BrowseOptions<TObject> & RequestOptions
    ): Readonly<BrowsablePromise<TObject>> {
      return BrowsablePromise.from<TObject>({
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
  ) => Readonly<BrowsablePromise<TObject>>;
};
