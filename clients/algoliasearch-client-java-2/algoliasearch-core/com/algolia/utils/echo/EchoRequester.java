package com.algolia.utils.echo;

import com.algolia.utils.Requester;
import okhttp3.Request;

public class EchoRequester implements Requester {

  private int connectionTimeout, readTimeout, writeTimeout;

  public EchoRequester() {
    this.connectionTimeout = 100;
    this.readTimeout = 100;
    this.writeTimeout = 100;
  }

  public CallEcho newCall(Request request) {
    return new CallEcho(request);
  }

  // NO-OP for now
  public void setDebugging(boolean debugging) {}

  public int getConnectTimeout() {
    return this.connectionTimeout;
  }

  public void setConnectTimeout(int connectionTimeout) {
    this.connectionTimeout = connectionTimeout;
  }

  public int getReadTimeout() {
    return this.readTimeout;
  }

  public void setReadTimeout(int readTimeout) {
    this.readTimeout = readTimeout;
  }

  public int getWriteTimeout() {
    return this.writeTimeout;
  }

  public void setWriteTimeout(int writeTimeout) {
    this.writeTimeout = writeTimeout;
  }
}
