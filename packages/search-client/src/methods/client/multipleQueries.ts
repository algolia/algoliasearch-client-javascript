import { Method } from '@algolia/requester-types/src/types/Method';
import { encodeQueryParameters } from '@algolia/support';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { MultipleQueriesOptions } from '../../types/MultipleQueriesOptions';
import { MultipleQueriesQuery } from '../../types/MultipleQueriesQuery';
import { MultipleQueriesResponse } from '../../types/MultipleQueriesResponse';

export const multipleQueries = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasMultipleQueries => {
  return {
    ...base,
    multipleQueries<TObject>(
      queries: readonly MultipleQueriesQuery[],
      requestOptions?: RequestOptions & MultipleQueriesOptions
    ): Readonly<Promise<MultipleQueriesResponse<TObject>>> {
      const requests = queries.map(query => {
        return {
          ...query,
          params: encodeQueryParameters(query.params),
        };
      });

      return this.transporter.read(
        {
          method: Method.Post,
          path: '1/indexes/*/queries',
          data: {
            requests,
          },
          cacheable: true,
        },
        requestOptions
      );
    },

    search<TObject>(
      queries: readonly MultipleQueriesQuery[],
      requestOptions?: RequestOptions & MultipleQueriesOptions
    ): Readonly<Promise<MultipleQueriesResponse<TObject>>> {
      return this.multipleQueries<TObject>(queries, requestOptions);
    },
  };
};

export type HasMultipleQueries = {
  readonly search: <TObject>(
    requests: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  readonly multipleQueries: <TObject>(
    requests: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
};
