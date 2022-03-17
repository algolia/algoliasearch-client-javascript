package com.algolia.codegen.cts;

public class CTSException extends Exception {
  private boolean skipable;

  public CTSException(String message) {
    super(message);
  }

  public CTSException(String message, boolean skipable) {
    this(message);
    this.skipable = skipable;
  }

  public boolean isSkipable() {
    return skipable;
  }
}
