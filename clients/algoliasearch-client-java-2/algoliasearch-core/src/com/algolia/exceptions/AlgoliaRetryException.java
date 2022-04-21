package com.algolia.exceptions;

/**
 * Exception thrown when an error occurs during the retry strategy. For example: All hosts are
 * unreachable.
 */
public class AlgoliaRetryException extends AlgoliaRuntimeException {

  public AlgoliaRetryException(String message, Throwable cause) {
    super(message, cause);
  }

  public AlgoliaRetryException(String message) {
    super(message);
  }

  public AlgoliaRetryException(Throwable cause) {
    super(cause);
  }
}
