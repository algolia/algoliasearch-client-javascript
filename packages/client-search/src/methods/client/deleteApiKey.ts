import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  Wait,
  WaitablePromise,
} from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { ApiError, RequestOptions } from '@sefai/transporter';

import { DeleteApiKeyResponse, getApiKey, SearchClient } from '../..';

export const deleteApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteApiKeyResponse>> => {
    const wait: Wait<DeleteApiKeyResponse> = (_, waitRequestOptions) => {
      return createRetryablePromise(retry => {
        return getApiKey(base)(apiKey, waitRequestOptions)
          .then(retry)
          .catch((apiError: ApiError) => {
            if (apiError.status !== 404) {
              throw apiError;
            }
          });
      });
    };

    return createWaitablePromise(
      base.transporter.write<DeleteApiKeyResponse>(
        {
          method: MethodEnum.Delete,
          path: encode('1/keys/%s', apiKey),
        },
        requestOptions
      ),
      wait
    );
  };
};
