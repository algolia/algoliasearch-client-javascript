package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** Parameters for the search. */
@ApiModel(description = "Parameters for the search.")
public class SearchRulesParams {

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query = "";

  public static final String SERIALIZED_NAME_ANCHORING = "anchoring";

  @SerializedName(SERIALIZED_NAME_ANCHORING)
  private Anchoring anchoring;

  public static final String SERIALIZED_NAME_CONTEXT = "context";

  @SerializedName(SERIALIZED_NAME_CONTEXT)
  private String context;

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_HITS_PER_PAGE = "hitsPerPage";

  @SerializedName(SERIALIZED_NAME_HITS_PER_PAGE)
  private Integer hitsPerPage = 20;

  public static final String SERIALIZED_NAME_ENABLED = "enabled";

  @SerializedName(SERIALIZED_NAME_ENABLED)
  private Boolean enabled;

  public static final String SERIALIZED_NAME_REQUEST_OPTIONS = "requestOptions";

  @SerializedName(SERIALIZED_NAME_REQUEST_OPTIONS)
  private List<Map<String, Object>> requestOptions = null;

  public SearchRulesParams query(String query) {
    this.query = query;
    return this;
  }

  /**
   * Full text query.
   *
   * @return query
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Full text query.")
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public SearchRulesParams anchoring(Anchoring anchoring) {
    this.anchoring = anchoring;
    return this;
  }

  /**
   * Get anchoring
   *
   * @return anchoring
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public Anchoring getAnchoring() {
    return anchoring;
  }

  public void setAnchoring(Anchoring anchoring) {
    this.anchoring = anchoring;
  }

  public SearchRulesParams context(String context) {
    this.context = context;
    return this;
  }

  /**
   * Restricts matches to contextual rules with a specific context (exact match).
   *
   * @return context
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Restricts matches to contextual rules with a specific context (exact match)."
  )
  public String getContext() {
    return context;
  }

  public void setContext(String context) {
    this.context = context;
  }

  public SearchRulesParams page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Requested page (zero-based).
   *
   * @return page
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Requested page (zero-based).")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public SearchRulesParams hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Maximum number of hits in a page. Minimum is 1, maximum is 1000.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Maximum number of hits in a page. Minimum is 1, maximum is 1000."
  )
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  public SearchRulesParams enabled(Boolean enabled) {
    this.enabled = enabled;
    return this;
  }

  /**
   * When specified, restricts matches to rules with a specific enabled status. When absent
   * (default), all rules are retrieved, regardless of their enabled status.
   *
   * @return enabled
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "When specified, restricts matches to rules with a specific enabled status. When absent" +
    " (default), all rules are retrieved, regardless of their enabled status."
  )
  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public SearchRulesParams requestOptions(
    List<Map<String, Object>> requestOptions
  ) {
    this.requestOptions = requestOptions;
    return this;
  }

  public SearchRulesParams addRequestOptionsItem(
    Map<String, Object> requestOptionsItem
  ) {
    if (this.requestOptions == null) {
      this.requestOptions = new ArrayList<>();
    }
    this.requestOptions.add(requestOptionsItem);
    return this;
  }

  /**
   * A mapping of requestOptions to send along with the request.
   *
   * @return requestOptions
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "A mapping of requestOptions to send along with the request."
  )
  public List<Map<String, Object>> getRequestOptions() {
    return requestOptions;
  }

  public void setRequestOptions(List<Map<String, Object>> requestOptions) {
    this.requestOptions = requestOptions;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchRulesParams searchRulesParams = (SearchRulesParams) o;
    return (
      Objects.equals(this.query, searchRulesParams.query) &&
      Objects.equals(this.anchoring, searchRulesParams.anchoring) &&
      Objects.equals(this.context, searchRulesParams.context) &&
      Objects.equals(this.page, searchRulesParams.page) &&
      Objects.equals(this.hitsPerPage, searchRulesParams.hitsPerPage) &&
      Objects.equals(this.enabled, searchRulesParams.enabled) &&
      Objects.equals(this.requestOptions, searchRulesParams.requestOptions)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      query,
      anchoring,
      context,
      page,
      hitsPerPage,
      enabled,
      requestOptions
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchRulesParams {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    anchoring: ")
      .append(toIndentedString(anchoring))
      .append("\n");
    sb.append("    context: ").append(toIndentedString(context)).append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
    sb
      .append("    requestOptions: ")
      .append(toIndentedString(requestOptions))
      .append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
