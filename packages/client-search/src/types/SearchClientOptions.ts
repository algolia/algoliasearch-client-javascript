import { AuthModeType } from '@algolia/client-common';

export type SearchClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly authMode?: AuthModeType;
};
