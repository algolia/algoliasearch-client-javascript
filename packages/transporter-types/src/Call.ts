export const Call: { readonly [key: string]: CallType } = {
  Read: 1,
  Write: 2,
  Any: 3,
};

export type CallType = 1 | 2 | 3;
