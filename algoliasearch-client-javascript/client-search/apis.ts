export * from './searchApi';
import { SearchApi } from './searchApi';

export class searchClient extends SearchApi {}

export * from '../utils/errors';
export { EchoRequester } from '../utils/EchoRequester';

export const APIS = [SearchApi];
