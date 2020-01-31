export const CallEnum: Readonly<Record<string, CallType>> = {
  /**
   * If the host is read only.
   */
  Read: 1,

  /**
   * If the host is write only.
   */
  Write: 2,

  /**
   * If the host is both read and write.
   */
  Any: 3,
};

export type CallType = 1 | 2 | 3;
