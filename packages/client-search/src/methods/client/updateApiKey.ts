import {
  createRetryablePromise,
  createWaitablePromise,
  encode,
  Wait,
  WaitablePromise,
} from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  ApiKeyACLType,
  getApiKey,
  GetApiKeyResponse,
  SearchClient,
  UpdateApiKeyOptions,
  UpdateApiKeyResponse,
} from '../..';

export const updateApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ): Readonly<WaitablePromise<UpdateApiKeyResponse>> => {
    const updatedFields = Object.assign({}, requestOptions);
    const { queryParameters, ...options } = requestOptions || {};
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
    ] as const;

    // Check that all the fields retrieved through getApiKey are the same as the ones we wanted to update
    const hasChanged = (getApiKeyResponse: GetApiKeyResponse): boolean => {
      return Object.keys(updatedFields)
        .filter(
          (updatedField: any): updatedField is typeof apiKeyFields[number] =>
            apiKeyFields.indexOf(updatedField) !== -1
        )
        .every(updatedField => {
          // If the field is an array, we need to check that they are the same length and that all the values are the same
          if (
            Array.isArray(getApiKeyResponse[updatedField]) &&
            Array.isArray(updatedFields[updatedField])
          ) {
            const getApiKeyResponseArray = getApiKeyResponse[updatedField] as
              | readonly ApiKeyACLType[]
              | readonly string[];

            return (
              getApiKeyResponseArray.length === updatedFields[updatedField].length &&
              getApiKeyResponseArray.every(
                (value, index) => value === updatedFields[updatedField][index]
              )
            );
          } else {
            return getApiKeyResponse[updatedField] === updatedFields[updatedField];
          }
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
        options
      ),
      wait
    );
  };
};
