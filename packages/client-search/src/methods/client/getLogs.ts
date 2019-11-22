import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { GetLogsResponse, SearchClient } from '../..';

export const getLogs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> => {
    const length = popRequestOption<number | undefined>(requestOptions, 'length');
    const offset = popRequestOption<number | undefined>(requestOptions, 'offset');
    const type = popRequestOption<string | undefined>(requestOptions, 'type');

    const options = mapRequestOptions(requestOptions);

    if (length !== undefined) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.length = length;
    }

    if (offset !== undefined) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.offset = offset;
    }

    if (type !== undefined) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.type = type;
    }

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/logs',
      },
      options
    );
  };
};
