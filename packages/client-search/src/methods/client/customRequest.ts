import { MethodEnum } from '@algolia/requester-common';
import { Request, RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../..';

export const customRequest = <TResponse = any>(base: SearchClient) => {
  return (request: Request, requestOptions?: RequestOptions): Readonly<Promise<TResponse>> => {
    if (request.method === MethodEnum.Get) {
      return base.transporter.read(request, requestOptions);
    }

    return base.transporter.write(request, requestOptions);
  };
};
