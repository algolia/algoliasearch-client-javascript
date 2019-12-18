export type Log = {
  /** Timestamp in ISO-8601 format. */
  readonly timeStamp: string;

  /** Rest type of the method. */
  readonly method: string;

  /** Http response code. */
  readonly answerCode: string;

  /** Request body. It’s truncated after 1000 characters. */
  readonly queryBody: string;

  /** Answer body. It’s truncated after 1000 characters. */
  readonly answer: string;

  /** Request URL. */
  readonly url: string;

  /** Client ip of the call. */
  readonly ip: string;

  /** SHA1 ID of entry. */
  readonly sha1: string;

  /** Request Headers (API Key is obfuscated). */
  readonly queryHeaders: string;

  /** Number Of Api Calls */
  readonly numberOfApiCalls: string;

  /** Processing time for the query. This does not include network time. */
  readonly processingTimeMS: string;

  /** Number of hits returned for the query. */
  readonly numberOfQueryHits: string;

  /** Exhaustive flags used during the query. */
  readonly exhaustive?: boolean;

  /** Index name of the log */
  readonly index: string;
};
