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

export const browseObjects = (base: SearchIndex) => {
  return <TObject>(
    requestOptions?: SearchOptions & BrowseOptions<TObject> & RequestOptions
  ): Readonly<Promise<void>> => {
    return createBrowsablePromise<TObject>({
      shouldStop: response => response.cursor === undefined,
      ...requestOptions,
      request: (data: Record<string, any>): Readonly<Promise<BrowseResponse<TObject>>> =>
        base.transporter.read(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/browse', base.indexName),
            data,
          },
          requestOptions
        ),
    });
  };
};
