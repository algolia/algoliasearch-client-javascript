import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  OnWaitClosure,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { SearchClient, UpdateApiKeyOptions, UpdateApiKeyResponse } from '../..';
import { getApiKey } from '.';

export const updateApiKey = <TClient extends SearchClient>(
  base: TClient
): TClient & HasUpdateApiKey => {
  return {
    ...base,
    updateApiKey(
      apiKey: string,
      requestOptions?: UpdateApiKeyOptions & RequestOptions
    ): Readonly<WaitablePromise<UpdateApiKeyResponse>> {
      const updatedFields = Object.assign({}, requestOptions);

      const queryParameters = popRequestOption<string | undefined>(
        requestOptions,
        'queryParameters'
      );

      const data = queryParameters ? { queryParameters } : {};

      const apiKeyFields = [
        'acl',
        'indexes',
        'referers',
        'restrictSources',
        'queryParameters',
        'description',
        'maxQueriesPerIPPerHour',
        'maxHitsPerQuery',
      ];

      const wait: OnWaitClosure<UpdateApiKeyResponse> = (_, waitRequestOptions) =>
        createRetryablePromise(retry => {
          return getApiKey(base)
            .getApiKey(apiKey, waitRequestOptions)
            .then(getApiKeyResponse => {
              const changed = Object.keys(updatedFields)
                .filter(updatedField => apiKeyFields.indexOf(updatedField) !== -1)
                .every(
                  // @ts-ignore
                  updatedField => getApiKeyResponse[updatedField] === updatedFields[updatedField]
                );

              return changed ? Promise.resolve() : retry();
            });
        });

      return createWaitablePromise(
        base.transporter.write<UpdateApiKeyResponse>(
          {
            method: MethodEnum.Put,
            path: encode('1/keys/%s', apiKey),
            data,
          },
          requestOptions
        )
      ).onWait(wait);
    },
  };
};

export type HasUpdateApiKey = {
  readonly updateApiKey: (
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions & RequestOptions
  ) => Readonly<WaitablePromise<UpdateApiKeyResponse>>;
};
