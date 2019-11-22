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

export const updateApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions & RequestOptions
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

    const wait: Wait<UpdateApiKeyResponse> = (_, waitRequestOptions) =>
      createRetryablePromise(retry => {
        return getApiKey(base)(apiKey, waitRequestOptions).then(getApiKeyResponse => {
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
      ),
      wait
    );
  };
};
