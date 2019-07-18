import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { IndexSettings } from '../Types/IndexSettings';

export const getSettings = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) =>
  class extends base implements HasGetSettings {
    public getSettings(requestOptions?: RequestOptions): Promise<IndexSettings> {
      const options = RequestOptions.from(requestOptions);

      options.queryParameters =
        options.queryParameters !== undefined ? options.queryParameters : {};

      options.queryParameters.getVersion = '2';

      return this.transporter.read(
        {
          method: Method.Get,
          path: `1/indexes/${this.indexName}/settings`,
        },
        options
      );
    }
  };

export interface HasGetSettings extends SearchIndex {
  getSettings(requestOptions?: RequestOptions): Promise<IndexSettings>;
}
