import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { GetLogsResponse, SearchClient } from '../..';

export const getLogs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> => {
    const length = popRequestOption(requestOptions, 'length', 10);
    const offset = popRequestOption(requestOptions, 'offset', 0);

    /** @todo Validate this request option. */
    const type = popRequestOption(requestOptions, 'type', 'all');

    const options = mapRequestOptions(requestOptions);

    // eslint-disable-next-line functional/immutable-data
    options.queryParameters.type = type;
    // eslint-disable-next-line functional/immutable-data
    options.queryParameters.length = length.toString();
    // eslint-disable-next-line functional/immutable-data
    options.queryParameters.offset = offset.toString();

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/logs',
      },
      options
    );
  };
};
