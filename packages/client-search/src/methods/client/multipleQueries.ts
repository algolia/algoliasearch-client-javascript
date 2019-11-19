import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, serializeQueryParameters } from '@algolia/transporter';

import {
  MultipleQueriesOptions,
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  SearchClient,
} from '../..';

export const multipleQueries = <TClient extends SearchClient>(
  base: TClient
): TClient & HasMultipleQueries => {
  const multipleQueriesFunction = <TObject>(
    queries: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions & MultipleQueriesOptions
  ): Readonly<Promise<MultipleQueriesResponse<TObject>>> => {
    const requests = queries.map(query => {
      return {
        ...query,
        params: serializeQueryParameters(query.params || {}),
      };
    });

    return base.transporter.read(
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
  };

  return {
    ...base,
    multipleQueries: multipleQueriesFunction,
    search: multipleQueriesFunction,
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
