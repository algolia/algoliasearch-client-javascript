import { CallType } from '.';

export type HostOptions = {
  readonly url: string;
  readonly accept: CallType;
  readonly protocol?: string;
};
