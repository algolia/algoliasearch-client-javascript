import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  Wait,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { ApiError, RequestOptions } from '@algolia/transporter';

import { getApiKey, RestoreApiKeyResponse, SearchClient } from '../..';

export const restoreApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<RestoreApiKeyResponse>> => {
    const wait: Wait<RestoreApiKeyResponse> = (_, waitRequestOptions) => {
      return createRetryablePromise(retry => {
        return getApiKey(base)(apiKey, waitRequestOptions).catch((apiError: ApiError) => {
          if (apiError.status !== 404) {
            throw apiError;
          }

          return retry();
        });
      });
    };

    return createWaitablePromise(
      base.transporter.write<RestoreApiKeyResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/keys/%s/restore', apiKey),
        },
        requestOptions
      ),
      wait
    );
  };
};
