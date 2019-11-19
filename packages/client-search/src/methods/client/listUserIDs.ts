import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { ListUserIDsOptions, ListUserIDsResponse, SearchClient } from '../..';

export const listUserIDs = <TClient extends SearchClient>(
  base: TClient
): TClient & HasListUserIDs => {
  return {
    ...base,
    listUserIDs(
      requestOptions?: ListUserIDsOptions & RequestOptions
    ): Readonly<Promise<ListUserIDsResponse>> {
      const options = mapRequestOptions(requestOptions);
      const page = popRequestOption<number | undefined>(requestOptions, 'page');
      const hitsPerPage = popRequestOption<number | undefined>(requestOptions, 'hitsPerPage');

      if (page !== undefined) {
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.page = page.toString();
      }

      if (hitsPerPage !== undefined) {
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.hitsPerPage = hitsPerPage.toString();
      }

      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/clusters/mapping',
        },
        options
      );
    },
  };
};

export type HasListUserIDs = {
  readonly listUserIDs: (
    requestOptions?: ListUserIDsOptions & RequestOptions
  ) => Readonly<Promise<ListUserIDsResponse>>;
};
