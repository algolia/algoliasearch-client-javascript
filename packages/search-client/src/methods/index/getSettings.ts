import { RequestOptions, mapRequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { IndexSettings } from '../types/IndexSettings';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSettings = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasGetSettings {
    public getSettings(requestOptions?: RequestOptions): Promise<IndexSettings> {
      const options = mapRequestOptions(
        Object.assign(requestOptions === undefined ? {} : requestOptions, {
          queryParameters: {
            getVersion: 2,
          },
        })
      );

      return this.transporter.read(
        {
          method: Method.Get,
          path: `1/indexes/${this.indexName}/settings`,
        },
        options
      );
    }
  };
};

export type HasGetSettings = {
  readonly getSettings: (requestOptions?: RequestOptions) => Promise<IndexSettings>;
};
