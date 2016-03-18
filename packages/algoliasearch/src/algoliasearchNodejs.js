import createClient from './createClient.js';

import * as clientMethods from './clientMethods.js';
import * as indexMethods from './indexMethods.js';
import * as indexObjectsMethods from './indexObjectsMethods.js';
import requester from './nodejsRequester.js';

export default createClient({
  clientMethods,
  indexMethods,
  indexObjectsMethods,
  requester
});
