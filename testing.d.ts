import { Requester } from '@algolia/requester-types';

declare const testing: {
  readonly request: () => Requester;
  readonly environment: () => string;
  readonly isBrowser: () => boolean;
};
