import { ConstructorOf } from '@algolia/support';

import { SearchIndex } from '../../SearchIndex';
import { SearchResponse } from '../types/SearchResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getObjectPosition = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasGetObjectPosition {
    public getObjectPosition(searchResponse: SearchResponse, objectID: string): number {
      // eslint-disable-next-line functional/no-loop-statement
      for (const [position, hit] of Object.entries(searchResponse.hits)) {
        if (hit.objectID === objectID) {
          return parseInt(position, 10);
        }
      }

      return -1;
    }
  };
};

export type HasGetObjectPosition = {
  readonly getObjectPosition: (
    searchResponse: SearchResponse,
    objectID: string
  ) => Readonly<number>;
};
