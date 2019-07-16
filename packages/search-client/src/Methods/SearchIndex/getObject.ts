import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { Method } from '@algolia/requester-types';

export const getObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetObject {
    public getObject<TObject>(objectId: string, requestOptions?: RequestOptions): Promise<TObject> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: `1/indexes/${this.indexName}/${objectId}`,
        },
        requestOptions
      );
    }
  };
};

export interface HasGetObject extends SearchIndex {
  getObject<TObject>(objectID: string, requestOptions?: RequestOptions): Promise<TObject>;
}
