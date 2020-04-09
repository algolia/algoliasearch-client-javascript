import {
  createRetryablePromise,
  createWaitablePromise,
  Wait,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { ApiError, RequestOptions } from '@algolia/transporter';

import {
  AddApiKeyOptions,
  AddApiKeyResponse,
  ApiKeyACLType,
  getApiKey,
  GetApiKeyResponse,
  SearchClient,
} from '../..';

export const addApiKey = (base: SearchClient) => {
  return (
    acl: readonly ApiKeyACLType[],
    requestOptions?: AddApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ): Readonly<WaitablePromise<AddApiKeyResponse>> => {
    const { queryParameters, ...options } = requestOptions || {};

    const data = {
      acl,
      ...(queryParameters !== undefined ? { queryParameters } : {}),
    };

    const wait: Wait<AddApiKeyResponse> = (response, waitRequestOptions) => {
      return createRetryablePromise<GetApiKeyResponse>(retry => {
        return getApiKey(base)(response.key, waitRequestOptions).catch((apiError: ApiError) => {
          if (apiError.status !== 404) {
            throw apiError;
          }

          return retry();
        });
      });
    };

    return createWaitablePromise(
      base.transporter.write<AddApiKeyResponse>(
        {
          method: MethodEnum.Post,
          path: '1/keys',
          data,
        },
        options
      ),
      wait
    );
  };
};
