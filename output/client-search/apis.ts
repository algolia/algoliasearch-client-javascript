export * from './searchApi';
import { SearchApi } from './searchApi';
import * as http from 'http';

export class HttpError extends Error {
  constructor(public response: http.IncomingMessage, public body: any, public statusCode?: number) {
    super('HTTP request failed');
    this.name = 'HttpError';
  }
}

export { RequestFile } from '../model/models';

export class searchClient extends SearchApi {}

export const APIS = [SearchApi];
