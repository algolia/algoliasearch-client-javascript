package com.algolia.utils.echo;

import com.algolia.Pair;
import com.algolia.model.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import okhttp3.HttpUrl;
import okhttp3.Request;
import okio.Buffer;

public class EchoResponse {

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

  public static class AddApiKey
    extends AddApiKeyResponse
    implements EchoResponseInterface {

    private Request request;

    public AddApiKey(Request request) {
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
  }

  public static class AddOrUpdateObject
    extends UpdatedAtWithObjectIdResponse
    implements EchoResponseInterface {

    private Request request;

    public AddOrUpdateObject(Request request) {
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
  }

  public static class AppendSource
    extends CreatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public AppendSource(Request request) {
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
  }

  public static class AssignUserId
    extends CreatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public AssignUserId(Request request) {
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
  }

  public static class Batch
    extends BatchResponse
    implements EchoResponseInterface {

    private Request request;

    public Batch(Request request) {
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
  }

  public static class BatchAssignUserIds
    extends CreatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public BatchAssignUserIds(Request request) {
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
  }

  public static class BatchDictionaryEntries
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public BatchDictionaryEntries(Request request) {
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
  }

  public static class BatchRules
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public BatchRules(Request request) {
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
  }

  public static class Browse
    extends BrowseResponse
    implements EchoResponseInterface {

    private Request request;

    public Browse(Request request) {
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
  }

  public static class ClearAllSynonyms
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public ClearAllSynonyms(Request request) {
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
  }

  public static class ClearObjects
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public ClearObjects(Request request) {
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
  }

  public static class ClearRules
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public ClearRules(Request request) {
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
  }

  public static class DeleteApiKey
    extends DeleteApiKeyResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteApiKey(Request request) {
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
  }

  public static class DeleteBy
    extends DeletedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteBy(Request request) {
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
  }

  public static class DeleteIndex
    extends DeletedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteIndex(Request request) {
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
  }

  public static class DeleteObject
    extends DeletedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteObject(Request request) {
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
  }

  public static class DeleteRule
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteRule(Request request) {
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
  }

  public static class DeleteSource
    extends DeleteSourceResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteSource(Request request) {
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
  }

  public static class DeleteSynonym
    extends DeletedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public DeleteSynonym(Request request) {
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
  }

  public static class GetApiKey extends Key implements EchoResponseInterface {

    private Request request;

    public GetApiKey(Request request) {
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
  }

  public static class GetDictionaryLanguages
    extends HashMap<String, Languages>
    implements EchoResponseInterface {

    private Request request;

    public GetDictionaryLanguages(Request request) {
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
  }

  public static class GetDictionarySettings
    extends GetDictionarySettingsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetDictionarySettings(Request request) {
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
  }

  public static class GetLogs
    extends GetLogsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetLogs(Request request) {
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
  }

  public static class GetObject
    extends HashMap<String, String>
    implements EchoResponseInterface {

    private Request request;

    public GetObject(Request request) {
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
  }

  public static class GetObjects
    extends GetObjectsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetObjects(Request request) {
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
  }

  public static class GetRule extends Rule implements EchoResponseInterface {

    private Request request;

    public GetRule(Request request) {
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
  }

  public static class GetSettings
    extends IndexSettings
    implements EchoResponseInterface {

    private Request request;

    public GetSettings(Request request) {
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
  }

  public static class GetSources
    extends ArrayList<Source>
    implements EchoResponseInterface {

    private Request request;

    public GetSources(Request request) {
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
  }

  public static class GetSynonym
    extends SynonymHit
    implements EchoResponseInterface {

    private Request request;

    public GetSynonym(Request request) {
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
  }

  public static class GetTask
    extends GetTaskResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTask(Request request) {
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
  }

  public static class GetTopUserIds
    extends GetTopUserIdsResponse
    implements EchoResponseInterface {

    private Request request;

    public GetTopUserIds(Request request) {
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
  }

  public static class GetUserId
    extends UserId
    implements EchoResponseInterface {

    private Request request;

    public GetUserId(Request request) {
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
  }

  public static class HasPendingMappings
    extends CreatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public HasPendingMappings(Request request) {
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
  }

  public static class ListApiKeys
    extends ListApiKeysResponse
    implements EchoResponseInterface {

    private Request request;

    public ListApiKeys(Request request) {
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
  }

  public static class ListClusters
    extends ListClustersResponse
    implements EchoResponseInterface {

    private Request request;

    public ListClusters(Request request) {
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
  }

  public static class ListIndices
    extends ListIndicesResponse
    implements EchoResponseInterface {

    private Request request;

    public ListIndices(Request request) {
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
  }

  public static class ListUserIds
    extends ListUserIdsResponse
    implements EchoResponseInterface {

    private Request request;

    public ListUserIds(Request request) {
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
  }

  public static class MultipleBatch
    extends MultipleBatchResponse
    implements EchoResponseInterface {

    private Request request;

    public MultipleBatch(Request request) {
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
  }

  public static class MultipleQueries
    extends MultipleQueriesResponse
    implements EchoResponseInterface {

    private Request request;

    public MultipleQueries(Request request) {
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
  }

  public static class OperationIndex
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public OperationIndex(Request request) {
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
  }

  public static class PartialUpdateObject
    extends UpdatedAtWithObjectIdResponse
    implements EchoResponseInterface {

    private Request request;

    public PartialUpdateObject(Request request) {
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
  }

  public static class RemoveUserId
    extends RemoveUserIdResponse
    implements EchoResponseInterface {

    private Request request;

    public RemoveUserId(Request request) {
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
  }

  public static class ReplaceSources
    extends ReplaceSourceResponse
    implements EchoResponseInterface {

    private Request request;

    public ReplaceSources(Request request) {
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
  }

  public static class RestoreApiKey
    extends AddApiKeyResponse
    implements EchoResponseInterface {

    private Request request;

    public RestoreApiKey(Request request) {
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
  }

  public static class SaveObject
    extends SaveObjectResponse
    implements EchoResponseInterface {

    private Request request;

    public SaveObject(Request request) {
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
  }

  public static class SaveRule
    extends UpdatedRuleResponse
    implements EchoResponseInterface {

    private Request request;

    public SaveRule(Request request) {
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
  }

  public static class SaveSynonym
    extends SaveSynonymResponse
    implements EchoResponseInterface {

    private Request request;

    public SaveSynonym(Request request) {
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
  }

  public static class SaveSynonyms
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public SaveSynonyms(Request request) {
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
  }

  public static class Search
    extends SearchResponse
    implements EchoResponseInterface {

    private Request request;

    public Search(Request request) {
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
  }

  public static class SearchDictionaryEntries
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public SearchDictionaryEntries(Request request) {
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
  }

  public static class SearchForFacetValues
    extends SearchForFacetValuesResponse
    implements EchoResponseInterface {

    private Request request;

    public SearchForFacetValues(Request request) {
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
  }

  public static class SearchRules
    extends SearchRulesResponse
    implements EchoResponseInterface {

    private Request request;

    public SearchRules(Request request) {
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
  }

  public static class SearchSynonyms
    extends SearchSynonymsResponse
    implements EchoResponseInterface {

    private Request request;

    public SearchSynonyms(Request request) {
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
  }

  public static class SearchUserIds
    extends SearchUserIdsResponse
    implements EchoResponseInterface {

    private Request request;

    public SearchUserIds(Request request) {
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
  }

  public static class SetDictionarySettings
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public SetDictionarySettings(Request request) {
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
  }

  public static class SetSettings
    extends UpdatedAtResponse
    implements EchoResponseInterface {

    private Request request;

    public SetSettings(Request request) {
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
  }

  public static class UpdateApiKey
    extends UpdateApiKeyResponse
    implements EchoResponseInterface {

    private Request request;

    public UpdateApiKey(Request request) {
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
  }
}
