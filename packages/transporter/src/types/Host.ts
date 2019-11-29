import { CallType } from '.';

export type Host = {
  /* eslint-disable functional/prefer-readonly-type */
  downDate: number;
  /* eslint-disable functional/prefer-readonly-type */
  up: boolean;
  readonly protocol: string;
  readonly url: string;
  readonly accept: CallType;
  readonly setAsDown: () => void;
  readonly isUp: () => boolean;
};
