import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetDictionarySettingsResponse, SearchClient } from '../..';

// TODO: fill in GetDictionarySettingsResponse type
export const getDictionarySettings = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetDictionarySettingsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '/1/dictionaries/*/settings',
      },
      requestOptions
    );
  };
};
