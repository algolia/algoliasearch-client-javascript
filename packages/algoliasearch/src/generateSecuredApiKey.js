// @flow
import crypto from 'crypto';
import { stringify } from 'querystring';
import type { ApiKey, SearchParameters } from 'types/Algolia';

type Timestamp = number;

type ApiKeyParameters = {|
  validUntil: Timestamp,
  restrictIndices: string,
  userToken: string,
  restrictSources: string,
|};

export type SecuredApiParameters = {|
  ...SearchParameters,
  ...ApiKeyParameters,
|};

export default function generateSecuredApiKey({
  privateApiKey,
  queryParameters,
}: {
  privateApiKey: ApiKey,
  queryParameters: SecuredApiParameters,
}) {
  const params = stringify(queryParameters);
  const securedKey = crypto
    .createHmac('sha256', privateApiKey)
    .update(params)
    .digest('hex');

  return new Buffer(securedKey + params).toString('base64');
}
