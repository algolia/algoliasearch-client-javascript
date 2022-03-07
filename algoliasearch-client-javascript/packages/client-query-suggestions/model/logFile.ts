export type LogFile = {
  /**
   * Date and time of creation of the record.
   */
  timestamp: string;
  /**
   * Type of the record, can be one of three values (INFO, SKIP or ERROR).
   */
  level: LogFileLevel;
  /**
   * Detailed description of what happened.
   */
  message: string;
  /**
   * Indicates the hierarchy of the records. For example, a record with contextLevel=1 belongs to a preceding record with contextLevel=0.
   */
  contextLevel: number;
};

export type LogFileLevel = 'ERROR' | 'INFO' | 'SKIP';
