// @flow
import crypto from 'crypto';
import type { ApiKey, SearchParameters } from './types';

export default function generateSecuredApiKey({
  privateApiKey,
  queryParameters,
}: {
  privateApiKey: ApiKey,
  queryParameters: SearchParameters,
}) {
  const securedKey = crypto
    .createHmac('sha256', privateApiKey)
    .update(queryParameters)
    .digest('hex');

  return new Buffer(securedKey + queryParameters).toString('base64');
}
