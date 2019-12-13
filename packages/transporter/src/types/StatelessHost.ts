import { CallType } from '.';

export type StatelessHost = {
  readonly protocol: string;
  readonly url: string;
  readonly accept: CallType;
};
