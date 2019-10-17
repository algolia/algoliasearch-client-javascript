import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchClient } from '../../SearchClient';
import { MultipleQueriesOptions } from '../types/MultipleQueriesOptions';
import { MultipleQueriesQuery } from '../types/MultipleQueriesQuery';
import { MultipleQueriesResponse } from '../types/MultipleQueriesResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const multipleQueries = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasMultipleQueries {
    public multipleQueries<TObject>(
      queries: readonly MultipleQueriesQuery[],
      requestOptions?: RequestOptions & MultipleQueriesOptions
    ): Readonly<Promise<MultipleQueriesResponse<TObject>>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: '1/indexes/*/queries',
          data: {
            requests: queries,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasMultipleQueries = {
  readonly multipleQueries: <TObject>(
    requests: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
};
