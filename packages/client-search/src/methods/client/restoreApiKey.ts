import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  OnWaitClosure,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createApiError, RequestOptions, TransporterAware } from '@algolia/transporter';

import { RestoreApiKeyResponse } from '../..';
import { getApiKey } from '.';

export const restoreApiKey = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasRestoreApiKey => {
  return {
    ...base,
    restoreApiKey(
      apiKey: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<RestoreApiKeyResponse>> {
      const wait: OnWaitClosure<RestoreApiKeyResponse> = (_, waitRequestOptions) => {
        return createRetryablePromise(retry => {
          return getApiKey(base)
            .getApiKey(apiKey, waitRequestOptions)
            .catch((apiError: ReturnType<typeof createApiError>) => {
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
        )
      ).onWait(wait);
    },
  };
};

export type HasRestoreApiKey = {
  readonly restoreApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<RestoreApiKeyResponse>>;
};
