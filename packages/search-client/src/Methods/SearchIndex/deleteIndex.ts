import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

export const deleteIndex = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasDelete {
    public delete(requestOptions?: RequestOptions): Promise<DeleteResponse> {
      return this.transporter.write(
        {
          method: Method.Delete,
          path: `1/indexes/${this.indexName}`,
        },
        requestOptions
      );
    }
  };
};

export interface HasDelete extends SearchIndex {
  delete(requestOptions?: RequestOptions): Promise<DeleteResponse>;
}

export type DeleteResponse = {
  taskID: number;
};
