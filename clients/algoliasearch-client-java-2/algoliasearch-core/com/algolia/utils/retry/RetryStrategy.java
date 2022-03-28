package com.algolia.utils.retry;

import com.algolia.exceptions.*;
import com.algolia.utils.Utils;
import java.io.IOException;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.time.Duration;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import okhttp3.HttpUrl;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class RetryStrategy {

  private final List<StatefulHost> hosts;

  public RetryStrategy(List<StatefulHost> hosts) {
    this.hosts = hosts;
  }

  public Interceptor getRetryInterceptor() {
    return new Interceptor() {
      @Override
      public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Iterator<StatefulHost> hostsIter = getTryableHosts(
            request.method().equals("GET") ? CallType.READ : CallType.WRITE)
            .iterator();
        while (hostsIter.hasNext()) {
          StatefulHost currentHost = hostsIter.next();

          // Building the request URL
          HttpUrl newUrl = request
              .url()
              .newBuilder()
              .scheme(currentHost.getScheme())
              .host(currentHost.getHost())
              .build();
          request = request.newBuilder().url(newUrl).build();

          // Computing timeout with the retry count
          chain.withConnectTimeout(
              chain.connectTimeoutMillis() + currentHost.getRetryCount() * 1000,
              TimeUnit.MILLISECONDS);

          try {
            System.out.println("MAKING REQUEST TO " + newUrl + " try: " + currentHost.getRetryCount());
            Response response = chain.proceed(request);
            currentHost.setLastUse(Utils.nowUTC());
            // no timeout
            if (response.isSuccessful()) {
              currentHost.setUp(true);
              return response;
            }
            if (isRetryable(response)) {
              currentHost.setUp(false);
              response.close();
              continue;
            }
            // unkown state, fail
            throw new AlgoliaApiException(response.message(), response.code());
          } catch (AlgoliaApiException e) {
            throw e;
          } catch (SocketTimeoutException e) {
            // timeout
            currentHost.setUp(true);
            currentHost.setLastUse(Utils.nowUTC());
            currentHost.incrementRetryCount();
          } catch (UnknownHostException e) {
            throw new AlgoliaApiException(e.getMessage(), 404);
          } catch (Exception e) {
            throw new AlgoliaApiException(e.getMessage(), 400);
          }
        }
        throw new AlgoliaRetryException("All hosts are unreachable");
      }
    };

  }

  /**
   * Tells if the response is retryable or not depending on the http status code
   *
   * @param response Algolia's API response
   */
  private boolean isRetryable(Response response) {
    return response.code() / 100 != 2 && response.code() / 100 != 4;
  }

  /**
   * Gives the available hosts.
   *
   * @param callType Algolia calltype.
   */
  List<StatefulHost> getTryableHosts(CallType callType) {
    synchronized (this) {
      resetExpiredHosts();
      if (hosts
          .stream()
          .anyMatch(h -> h.isUp() && h.getAccept().contains(callType))) {
        return hosts
            .stream()
            .filter(h -> h.isUp() && h.getAccept().contains(callType))
            .collect(Collectors.toList());
      } else {
        for (StatefulHost host : hosts
            .stream()
            .filter(h -> h.getAccept().contains(callType))
            .collect(Collectors.toList())) {
          reset(host);
        }

        return hosts;
      }
    }
  }

  /**
   * Reset the given hosts. Sets the retry count to 0 and set the last use to now.
   *
   * @param host The host to reset
   */
  private void reset(StatefulHost host) {
    host.setUp(true).setRetryCount(0).setLastUse(Utils.nowUTC());
  }

  /** Reset all hosts down for more than 5 minutes. */
  private void resetExpiredHosts() {
    for (StatefulHost host : hosts) {
      long lastUse = Duration
          .between(Utils.nowUTC(), host.getLastUse())
          .getSeconds();
      if (!host.isUp() && Math.abs(lastUse) > 5 * 60) {
        reset(host);
      }
    }
  }
}
