import {
  createRetryablePromise,
  createWaitablePromise,
  OnWaitClosure,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import {
  createApiError,
  popRequestOption,
  RequestOptions,
  TransporterAware,
} from '@algolia/transporter';

import { AddApiKeyOptions, AddApiKeyResponse } from '../..';
import { GetApiKeyResponse } from '../../types';
import { getApiKey } from '.';

export const addApiKey = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasAddApiKey => {
  return {
    ...base,
    addApiKey(
      acl: readonly string[],
      requestOptions?: AddApiKeyOptions & RequestOptions
    ): Readonly<WaitablePromise<AddApiKeyResponse>> {
      const queryParameters = popRequestOption<string | undefined>(
        requestOptions,
        'queryParameters'
      );

      const data = {
        acl,
        ...(queryParameters !== undefined ? { queryParameters } : {}),
      };

      const wait: OnWaitClosure<AddApiKeyResponse> = (response, waitRequestOptions) => {
        return createRetryablePromise<GetApiKeyResponse>(retry => {
          return getApiKey(base)
            .getApiKey(response.key, waitRequestOptions)
            .catch((apiError: ReturnType<typeof createApiError>) => {
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
        )
      ).onWait(wait);
    },
  };
};

export type HasAddApiKey = {
  readonly addApiKey: (
    acl: readonly string[],
    requestOptions?: AddApiKeyOptions & RequestOptions
  ) => Readonly<WaitablePromise<AddApiKeyResponse>>;
};
