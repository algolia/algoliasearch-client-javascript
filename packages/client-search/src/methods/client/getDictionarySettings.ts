import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { GetDictionarySettingsResponse, SearchClient } from '../..';

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
