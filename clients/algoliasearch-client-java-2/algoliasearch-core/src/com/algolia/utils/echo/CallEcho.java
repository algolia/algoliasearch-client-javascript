package com.algolia.utils.echo;

import java.io.IOException;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Request;
import okhttp3.Response;
import okio.Timeout;

public class CallEcho implements Call {

  private Request request;

  public CallEcho(Request request) {
    this.request = request;
  }

  @Override
  public Request request() {
    return request;
  }

  @Override
  public void cancel() {}

  @Override
  public Call clone() {
    return null;
  }

  @Override
  public void enqueue(Callback arg0) {}

  @Override
  public Response execute() throws IOException {
    return null;
  }

  @Override
  public boolean isExecuted() {
    return false;
  }

  @Override
  public boolean isCanceled() {
    return false;
  }

  @Override
  public Timeout timeout() {
    return null;
  }
}
