package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** OK */
public class SearchUserIdsObject {

  @SerializedName("query")
  private String query;

  @SerializedName("clusterName")
  private String clusterName;

  @SerializedName("page")
  private Integer page = 0;

  @SerializedName("hitsPerPage")
  private Integer hitsPerPage = 20;

  public SearchUserIdsObject query(String query) {
    this.query = query;
    return this;
  }

  /**
   * Query to search. The search is a prefix search with typoTolerance. Use empty query to retrieve
   * all users.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public SearchUserIdsObject clusterName(String clusterName) {
    this.clusterName = clusterName;
    return this;
  }

  /**
   * Name of the cluster.
   *
   * @return clusterName
   */
  @javax.annotation.Nullable
  public String getClusterName() {
    return clusterName;
  }

  public void setClusterName(String clusterName) {
    this.clusterName = clusterName;
  }

  public SearchUserIdsObject page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public SearchUserIdsObject hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchUserIdsObject searchUserIdsObject = (SearchUserIdsObject) o;
    return (
      Objects.equals(this.query, searchUserIdsObject.query) &&
      Objects.equals(this.clusterName, searchUserIdsObject.clusterName) &&
      Objects.equals(this.page, searchUserIdsObject.page) &&
      Objects.equals(this.hitsPerPage, searchUserIdsObject.hitsPerPage)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(query, clusterName, page, hitsPerPage);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchUserIdsObject {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    clusterName: ")
      .append(toIndentedString(clusterName))
      .append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
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
