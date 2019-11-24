import {
  createRetryablePromise,
  createWaitablePromise,
  Wait,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { ApiError, popRequestOption, RequestOptions } from '@algolia/transporter';

import {
  AddApiKeyOptions,
  AddApiKeyResponse,
  getApiKey,
  GetApiKeyResponse,
  SearchClient,
} from '../..';

export const addApiKey = (base: SearchClient) => {
  return (
    acl: readonly string[],
    requestOptions?: AddApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ): Readonly<WaitablePromise<AddApiKeyResponse>> => {
    const queryParameters = popRequestOption<string | undefined>(requestOptions, 'queryParameters');

    const data = {
      acl,
      ...(queryParameters !== undefined ? { queryParameters } : {}),
    };

    const wait: Wait<AddApiKeyResponse> = (response, waitRequestOptions) => {
      return createRetryablePromise<GetApiKeyResponse>(retry => {
        return getApiKey(base)(response.key, waitRequestOptions).catch((apiError: ApiError) => {
          if (apiError.status === 404) {
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
        requestOptions
      ),
      wait
    );
  };
};
