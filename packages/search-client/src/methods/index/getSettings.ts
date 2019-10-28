import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { IndexSettings } from '../types/IndexSettings';

export const getSettings = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetSettings => {
  return {
    ...base,
    getSettings(requestOptions?: RequestOptions): Readonly<Promise<IndexSettings>> {
      const options = mapRequestOptions(requestOptions !== undefined ? requestOptions : {});

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.getVersion = '2';

      return this.transporter.read(
        {
          method: Method.Get,
          path: encode('1/indexes/%s/settings', this.indexName),
        },
        options
      );
    },
  };
};

export type HasGetSettings = {
  readonly getSettings: (requestOptions?: RequestOptions) => Readonly<Promise<IndexSettings>>;
};
