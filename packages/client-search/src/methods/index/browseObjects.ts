import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
