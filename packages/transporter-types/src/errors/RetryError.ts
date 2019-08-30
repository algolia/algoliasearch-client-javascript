export class RetryError extends Error {
  public static make(): RetryError {
    return {
      name: RetryError.name,
      message: 'Unreachable hosts',
    };
  }
}
