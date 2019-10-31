import { encodeQueryParameters } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

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
          method: MethodEnum.Post,
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
