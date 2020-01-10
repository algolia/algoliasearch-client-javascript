import { serializeQueryParameters } from '@algolia/transporter';
import * as crypto from 'crypto';

import { SecuredApiKeyRestrictions } from '../..';

export const generateSecuredApiKey = () => {
  return (parentApiKey: string, restrictions: SecuredApiKeyRestrictions): string => {
    const queryParameters = serializeQueryParameters(restrictions);

    const securedKey = crypto
      .createHmac('sha256', parentApiKey)
      .update(queryParameters)
      .digest('hex');

    return Buffer.from(securedKey + queryParameters).toString('base64');
  };
};
