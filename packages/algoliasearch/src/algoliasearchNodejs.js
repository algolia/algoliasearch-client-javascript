import createClient from './createClient.js';

import * as clientMethods from './clientMethods.js';
import * as indexMethods from './indexMethods.js';
import * as objectMethods from './objectMethods.js';
import requester from './nodejsRequester.js';

export default createClient({
  clientMethods,
  indexMethods,
  objectMethods,
  requester
});
