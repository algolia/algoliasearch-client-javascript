import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { IndexSettings } from '../types/IndexSettings';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSettings = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasGetSettings {
    public getSettings(requestOptions?: RequestOptions): Readonly<Promise<IndexSettings>> {
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
    }
  };
};

export type HasGetSettings = {
  readonly getSettings: (requestOptions?: RequestOptions) => Readonly<Promise<IndexSettings>>;
};
