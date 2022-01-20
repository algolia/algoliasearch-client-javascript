package com.algolia.utils.echo;

import com.algolia.ApiException;
import com.algolia.utils.Requester;
import okhttp3.Request;

public class EchoRequester implements Requester {

  public CallEcho newCall(Request request) throws ApiException {
    return new CallEcho(request);
  }

  // NO-OP for now

  public void setDebugging(boolean debugging) {}

  public int getConnectTimeout() {
    return 100;
  }

  public void setConnectTimeout(int connectionTimeout) {}

  public int getReadTimeout() {
    return 100;
  }

  public void setReadTimeout(int readTimeout) {}

  public int getWriteTimeout() {
    return 100;
  }

  public void setWriteTimeout(int writeTimeout) {}
}
