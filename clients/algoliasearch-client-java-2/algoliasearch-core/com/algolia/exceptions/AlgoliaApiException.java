package com.algolia.exceptions;

/** Exception thrown in case of API failure such as 4XX, 5XX error. */
public class AlgoliaApiException extends AlgoliaRuntimeException {

  public int getHttpErrorCode() {
    return httpErrorCode;
  }

  private final int httpErrorCode;

  public AlgoliaApiException(
    String message,
    Throwable cause,
    int httpErrorCode
  ) {
    super(message, cause);
    this.httpErrorCode = httpErrorCode;
  }

  public AlgoliaApiException(String message, int httpErrorCode) {
    super(message);
    this.httpErrorCode = httpErrorCode;
  }

  public AlgoliaApiException(Throwable cause, int httpErrorCode) {
    super(cause);
    this.httpErrorCode = httpErrorCode;
  }
}
