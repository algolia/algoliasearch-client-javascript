package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Key */
public class Key {

  @SerializedName("acl")
  private List<Acl> acl = new ArrayList<>();

  @SerializedName("description")
  private String description = "";

  @SerializedName("indexes")
  private List<String> indexes = null;

  @SerializedName("maxHitsPerQuery")
  private Integer maxHitsPerQuery = 0;

  @SerializedName("maxQueriesPerIPPerHour")
  private Integer maxQueriesPerIPPerHour = 0;

  @SerializedName("queryParameters")
  private String queryParameters = "";

  @SerializedName("referers")
  private List<String> referers = null;

  @SerializedName("validity")
  private Integer validity = 0;

  @SerializedName("createdAt")
  private String createdAt;

  public Key setAcl(List<Acl> acl) {
    this.acl = acl;
    return this;
  }

  public Key addAclItem(Acl aclItem) {
    this.acl.add(aclItem);
    return this;
  }

  /**
   * Set of permissions associated with the key.
   *
   * @return acl
   */
  @javax.annotation.Nonnull
  public List<Acl> getAcl() {
    return acl;
  }

  public Key setDescription(String description) {
    this.description = description;
    return this;
  }

  /**
   * A comment used to identify a key more easily in the dashboard. It is not interpreted by the
   * API.
   *
   * @return description
   */
  @javax.annotation.Nullable
  public String getDescription() {
    return description;
  }

  public Key setIndexes(List<String> indexes) {
    this.indexes = indexes;
    return this;
  }

  public Key addIndexesItem(String indexesItem) {
    if (this.indexes == null) {
      this.indexes = new ArrayList<>();
    }
    this.indexes.add(indexesItem);
    return this;
  }

  /**
   * Restrict this new API key to a list of indices or index patterns. If the list is empty, all
   * indices are allowed.
   *
   * @return indexes
   */
  @javax.annotation.Nullable
  public List<String> getIndexes() {
    return indexes;
  }

  public Key setMaxHitsPerQuery(Integer maxHitsPerQuery) {
    this.maxHitsPerQuery = maxHitsPerQuery;
    return this;
  }

  /**
   * Maximum number of hits this API key can retrieve in one query. If zero, no limit is enforced.
   *
   * @return maxHitsPerQuery
   */
  @javax.annotation.Nullable
  public Integer getMaxHitsPerQuery() {
    return maxHitsPerQuery;
  }

  public Key setMaxQueriesPerIPPerHour(Integer maxQueriesPerIPPerHour) {
    this.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
    return this;
  }

  /**
   * Maximum number of API calls per hour allowed from a given IP address or a user token.
   *
   * @return maxQueriesPerIPPerHour
   */
  @javax.annotation.Nullable
  public Integer getMaxQueriesPerIPPerHour() {
    return maxQueriesPerIPPerHour;
  }

  public Key setQueryParameters(String queryParameters) {
    this.queryParameters = queryParameters;
    return this;
  }

  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with
   * this API key.
   *
   * @return queryParameters
   */
  @javax.annotation.Nullable
  public String getQueryParameters() {
    return queryParameters;
  }

  public Key setReferers(List<String> referers) {
    this.referers = referers;
    return this;
  }

  public Key addReferersItem(String referersItem) {
    if (this.referers == null) {
      this.referers = new ArrayList<>();
    }
    this.referers.add(referersItem);
    return this;
  }

  /**
   * Restrict this new API key to specific referers. If empty or blank, defaults to all referers.
   *
   * @return referers
   */
  @javax.annotation.Nullable
  public List<String> getReferers() {
    return referers;
  }

  public Key setValidity(Integer validity) {
    this.validity = validity;
    return this;
  }

  /**
   * Validity limit for this key in seconds. The key will automatically be removed after this period
   * of time.
   *
   * @return validity
   */
  @javax.annotation.Nullable
  public Integer getValidity() {
    return validity;
  }

  public Key setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Date of creation (ISO-8601 format).
   *
   * @return createdAt
   */
  @javax.annotation.Nonnull
  public String getCreatedAt() {
    return createdAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Key key = (Key) o;
    return (
      Objects.equals(this.acl, key.acl) &&
      Objects.equals(this.description, key.description) &&
      Objects.equals(this.indexes, key.indexes) &&
      Objects.equals(this.maxHitsPerQuery, key.maxHitsPerQuery) &&
      Objects.equals(this.maxQueriesPerIPPerHour, key.maxQueriesPerIPPerHour) &&
      Objects.equals(this.queryParameters, key.queryParameters) &&
      Objects.equals(this.referers, key.referers) &&
      Objects.equals(this.validity, key.validity) &&
      Objects.equals(this.createdAt, key.createdAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      acl,
      description,
      indexes,
      maxHitsPerQuery,
      maxQueriesPerIPPerHour,
      queryParameters,
      referers,
      validity,
      createdAt
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Key {\n");
    sb.append("    acl: ").append(toIndentedString(acl)).append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
      .append("\n");
    sb.append("    indexes: ").append(toIndentedString(indexes)).append("\n");
    sb
      .append("    maxHitsPerQuery: ")
      .append(toIndentedString(maxHitsPerQuery))
      .append("\n");
    sb
      .append("    maxQueriesPerIPPerHour: ")
      .append(toIndentedString(maxQueriesPerIPPerHour))
      .append("\n");
    sb
      .append("    queryParameters: ")
      .append(toIndentedString(queryParameters))
      .append("\n");
    sb.append("    referers: ").append(toIndentedString(referers)).append("\n");
    sb.append("    validity: ").append(toIndentedString(validity)).append("\n");
    sb
      .append("    createdAt: ")
      .append(toIndentedString(createdAt))
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
