import { addMethods } from '@sefai/client-common';

import { SearchClient, SearchIndex } from '../..';
import { CreateIndex } from '../../types/CreateIndex';

export const initIndex = (base: SearchClient): CreateIndex => {
  return (indexName, options = {}) => {
    const searchIndex: SearchIndex = {
      transporter: base.transporter,
      appId: base.appId,
      indexName,
    };

    return addMethods(searchIndex, options.methods);
  };
};
