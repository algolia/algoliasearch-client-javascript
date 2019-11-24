import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  Wait,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { getApiKey, SearchClient, UpdateApiKeyOptions, UpdateApiKeyResponse } from '../..';
import { GetApiKeyResponse } from '../../types';

export const updateApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ): Readonly<WaitablePromise<UpdateApiKeyResponse>> => {
    const updatedFields = Object.assign({}, requestOptions);

    const queryParameters = popRequestOption<string | undefined>(requestOptions, 'queryParameters');

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

    const hasChanged = (getApiKeyResponse: GetApiKeyResponse): boolean => {
      return Object.keys(updatedFields)
        .filter(updatedField => apiKeyFields.indexOf(updatedField) !== -1)
        .every(updatedField => {
          // @ts-ignore
          return getApiKeyResponse[updatedField] === updatedFields[updatedField];
        });
    };

    const wait: Wait<UpdateApiKeyResponse> = (_, waitRequestOptions) =>
      createRetryablePromise(retry => {
        return getApiKey(base)(apiKey, waitRequestOptions).then(getApiKeyResponse => {
          return hasChanged(getApiKeyResponse) ? Promise.resolve() : retry();
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
      ),
      wait
    );
  };
};
