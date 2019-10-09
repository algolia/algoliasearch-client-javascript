import { RequestOptions } from '@algolia/transporter-types';
import { SearchClient } from '../../SearchClient';
import { ConstructorOf } from '@algolia/support';
import { Method } from '@algolia/requester-types';
import { MultipleQueriesResponse } from '../types/MultipleQueriesResponse';
import { MultipleQueriesQuery } from '../types/MultipleQueriesQuery';
import { MultipleQueriesOptions } from '../types/MultipleQueriesOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const multipleQueries = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasMultipleQueries {
    public multipleQueries<TObject>(
      queries: readonly MultipleQueriesQuery[],
      requestOptions?: RequestOptions & MultipleQueriesOptions
    ): Promise<MultipleQueriesResponse<TObject>> {
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
  ) => Promise<MultipleQueriesResponse<TObject>>;
};
