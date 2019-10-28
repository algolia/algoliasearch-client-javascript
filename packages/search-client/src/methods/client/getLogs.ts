import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { GetLogsResponse } from '../types/GetLogsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLogs = <TSearchClient extends ConstructorOf<SearchClient>>(base: TSearchClient) => {
  return class extends base implements HasGetLogs {
    public getLogs(requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> {
      const length = popRequestOption(requestOptions, 'length', 10);
      const offset = popRequestOption(requestOptions, 'offset', 0);

      /** @todo Validate this request option. */
      const type = popRequestOption(requestOptions, 'type', 'all');

      const options = mapRequestOptions(requestOptions);

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.type = type;

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.length = length;

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.offset = offset;

      return this.transporter.read(
        {
          method: Method.Get,
          path: '1/logs',
        },
        options
      );
    }
  };
};

export type HasGetLogs = {
  readonly getLogs: (requestOptions?: RequestOptions) => Readonly<Promise<GetLogsResponse>>;
};
