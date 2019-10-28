import { Method } from '@algolia/requester-types';
import {
  mapRequestOptions,
  popRequestOption,
  RequestOptions,
  TransporterAware,
} from '@algolia/transporter';

import { GetLogsResponse } from '../../types/GetLogsResponse';

export const getLogs = <TClient extends TransporterAware>(base: TClient): TClient & HasGetLogs => {
  return {
    ...base,
    getLogs(requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> {
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
    },
  };
};

export type HasGetLogs = {
  readonly getLogs: (requestOptions?: RequestOptions) => Readonly<Promise<GetLogsResponse>>;
};
