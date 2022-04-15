package com.algolia.utils.echo;

import com.algolia.Pair;
import com.algolia.model.analytics.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import okhttp3.HttpUrl;
import okhttp3.Request;
import okio.Buffer;

public class EchoResponseAnalytics {

  private static String parseRequestBody(Request req) {
    try {
      final Request copy = req.newBuilder().build();
      final Buffer buffer = new Buffer();
      copy.body().writeTo(buffer);
      return buffer.readUtf8();
    } catch (final IOException e) {
      return "error";
    }
  }

  private static List<Pair> buildQueryParams(Request req) {
    List<Pair> params = new ArrayList<Pair>();
    HttpUrl url = req.url();
    for (String name : url.queryParameterNames()) {
      for (String value : url.queryParameterValues(name)) {
        params.add(new Pair(name, value));
      }
    }
    return params;
  }

  public static class Del extends Object implements EchoResponseInterface {

    private Request request;

    public Del(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class Get extends Object implements EchoResponseInterface {

    private Request request;

    public Get(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetAverageClickPosition
    extends GetAverageClickPositionResponse
    implements EchoResponseInterface {

    private Request request;

    public GetAverageClickPosition(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetClickPositions
    extends GetClickPositionsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetClickPositions(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetClickThroughRate
    extends GetClickThroughRateResponse
    implements EchoResponseInterface {

    private Request request;

    public GetClickThroughRate(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetConversationRate
    extends GetConversationRateResponse
    implements EchoResponseInterface {

    private Request request;

    public GetConversationRate(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetNoClickRate
    extends GetNoClickRateResponse
    implements EchoResponseInterface {

    private Request request;

    public GetNoClickRate(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetNoResultsRate
    extends GetNoResultsRateResponse
    implements EchoResponseInterface {

    private Request request;

    public GetNoResultsRate(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetSearchesCount
    extends GetSearchesCountResponse
    implements EchoResponseInterface {

    private Request request;

    public GetSearchesCount(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetSearchesNoClicks
    extends GetSearchesNoClicksResponse
    implements EchoResponseInterface {

    private Request request;

    public GetSearchesNoClicks(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetSearchesNoResults
    extends GetSearchesNoResultsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetSearchesNoResults(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetStatus
    extends GetStatusResponse
    implements EchoResponseInterface {

    private Request request;

    public GetStatus(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopCountries
    extends GetTopCountriesResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopCountries(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopFilterAttributes
    extends GetTopFilterAttributesResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopFilterAttributes(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopFilterForAttribute
    extends GetTopFilterForAttributeResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopFilterForAttribute(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopFiltersNoResults
    extends GetTopFiltersNoResultsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopFiltersNoResults(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopHits
    extends GetTopHitsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopHits(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetTopSearches
    extends GetTopSearchesResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopSearches(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class GetUsersCount
    extends GetUsersCountResponse
    implements EchoResponseInterface {

    private Request request;

    public GetUsersCount(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class Post extends Object implements EchoResponseInterface {

    private Request request;

    public Post(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }

  public static class Put extends Object implements EchoResponseInterface {

    private Request request;

    public Put(Request request) {
      this.request = request;
    }

    public String getPath() {
      return request.url().encodedPath();
    }

    public String getMethod() {
      return request.method();
    }

    public String getBody() {
      return parseRequestBody(request);
    }

    public List<Pair> getQueryParams() {
      return buildQueryParams(request);
    }

    // to satisfy CompoundType in case it's a parent
    public Object getInsideValue() {
      return null;
    }
  }
}
