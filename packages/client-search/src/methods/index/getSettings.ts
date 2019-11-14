import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { IndexSettings, SearchIndex } from '../..';

export const getSettings = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetSettings => {
  return {
    ...base,
    getSettings(requestOptions?: RequestOptions): Readonly<Promise<IndexSettings>> {
      const options = mapRequestOptions(requestOptions);

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.getVersion = '2';

      return this.transporter.read(
        {
          method: MethodEnum.Get,
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
