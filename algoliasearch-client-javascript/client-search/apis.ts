export * from './searchApi';
import { SearchApi } from './searchApi';

export class searchClient extends SearchApi {}

export * from '../utils/errors';
export { EchoRequester } from '../utils/requester/EchoRequester';

export const APIS = [SearchApi];
