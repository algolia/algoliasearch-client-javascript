export * from './recommendApi';
import { RecommendApi } from './recommendApi';
export * from '../utils/errors';
export { EchoRequester } from '../utils/requester/EchoRequester';

export const APIS = [RecommendApi];
