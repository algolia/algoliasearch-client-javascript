import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  OnWaitClosure,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { ApiError, RequestOptions } from '@algolia/transporter';

import { DeleteApiKeyResponse, getApiKey, GetApiKeyResponse, SearchClient } from '../..';

export const deleteApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteApiKeyResponse>> => {
    const wait: OnWaitClosure<DeleteApiKeyResponse> = (_, waitRequestOptions) => {
      return createRetryablePromise<GetApiKeyResponse>(retry => {
        return getApiKey(base)(apiKey, waitRequestOptions)
          .catch((apiError: ApiError) => {
            if (apiError.status !== 404) {
              throw apiError;
            }
          })
          .then(retry);
      });
    };

    return createWaitablePromise(
      base.transporter.write<DeleteApiKeyResponse>(
        {
          method: MethodEnum.Delete,
          path: encode('1/keys/%s', apiKey),
        },
        requestOptions
      )
    ).onWait(wait);
  };
};
