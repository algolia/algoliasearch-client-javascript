import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetObject {
    public getObject<TObject>(objectID: string, requestOptions?: RequestOptions): Promise<TObject> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode('1/indexes/%s/%s', this.indexName, objectID),
        },
        requestOptions
      );
    }
  };
};

export type HasGetObject = {
  readonly getObject: <TObject>(
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TObject>>;
};
