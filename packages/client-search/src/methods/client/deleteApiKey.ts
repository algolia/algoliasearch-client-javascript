import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  OnWaitClosure,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createApiError, RequestOptions, TransporterAware } from '@algolia/transporter';

import { DeleteApiKeyResponse } from '../..';
import { GetApiKeyResponse } from '../../types';
import { getApiKey } from '.';

export const deleteApiKey = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasDeleteApiKey => {
  return {
    ...base,
    deleteApiKey(
      apiKey: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteApiKeyResponse>> {
      const wait: OnWaitClosure<DeleteApiKeyResponse> = (_, waitRequestOptions) => {
        return createRetryablePromise<GetApiKeyResponse>(retry => {
          return getApiKey(base)
            .getApiKey(apiKey, waitRequestOptions)
            .catch((apiError: ReturnType<typeof createApiError>) => {
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
    },
  };
};

export type HasDeleteApiKey = {
  readonly deleteApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteApiKeyResponse>>;
};
