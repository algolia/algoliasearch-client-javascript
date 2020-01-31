import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../..';
import { getSettings } from '.';

export const exists = (base: SearchIndex) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<boolean>> => {
    return getSettings(base)(requestOptions)
      .then(() => true)
      .catch(error => {
        if (error.status !== 404) {
          throw error;
        }

        return false;
      });
  };
};
