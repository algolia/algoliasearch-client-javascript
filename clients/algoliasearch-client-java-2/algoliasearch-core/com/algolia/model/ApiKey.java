package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Api Key object. */
public class ApiKey {

  /** Gets or Sets acl */
  @JsonAdapter(AclEnum.Adapter.class)
  public enum AclEnum {
    ADDOBJECT("addObject"),

    ANALYTICS("analytics"),

    BROWSE("browse"),

    DELETEOBJECT("deleteObject"),

    DELETEINDEX("deleteIndex"),

    EDITSETTINGS("editSettings"),

    LISTINDEXES("listIndexes"),

    LOGS("logs"),

    PERSONALIZATION("personalization"),

    RECOMMENDATION("recommendation"),

    SEARCH("search"),

    SEEUNRETRIEVABLEATTRIBUTES("seeUnretrievableAttributes"),

    SETTINGS("settings"),

    USAGE("usage");

    private String value;

    AclEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static AclEnum fromValue(String value) {
      for (AclEnum b : AclEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<AclEnum> {

      @Override
      public void write(final JsonWriter jsonWriter, final AclEnum enumeration)
        throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public AclEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return AclEnum.fromValue(value);
      }
    }
  }

  @SerializedName("acl")
  private List<AclEnum> acl = new ArrayList<>();

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

  public ApiKey acl(List<AclEnum> acl) {
    this.acl = acl;
    return this;
  }

  public ApiKey addAclItem(AclEnum aclItem) {
    this.acl.add(aclItem);
    return this;
  }

  /**
   * Set of permissions associated with the key.
   *
   * @return acl
   */
  @javax.annotation.Nonnull
  public List<AclEnum> getAcl() {
    return acl;
  }

  public void setAcl(List<AclEnum> acl) {
    this.acl = acl;
  }

  public ApiKey description(String description) {
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

  public void setDescription(String description) {
    this.description = description;
  }

  public ApiKey indexes(List<String> indexes) {
    this.indexes = indexes;
    return this;
  }

  public ApiKey addIndexesItem(String indexesItem) {
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

  public void setIndexes(List<String> indexes) {
    this.indexes = indexes;
  }

  public ApiKey maxHitsPerQuery(Integer maxHitsPerQuery) {
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

  public void setMaxHitsPerQuery(Integer maxHitsPerQuery) {
    this.maxHitsPerQuery = maxHitsPerQuery;
  }

  public ApiKey maxQueriesPerIPPerHour(Integer maxQueriesPerIPPerHour) {
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

  public void setMaxQueriesPerIPPerHour(Integer maxQueriesPerIPPerHour) {
    this.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
  }

  public ApiKey queryParameters(String queryParameters) {
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

  public void setQueryParameters(String queryParameters) {
    this.queryParameters = queryParameters;
  }

  public ApiKey referers(List<String> referers) {
    this.referers = referers;
    return this;
  }

  public ApiKey addReferersItem(String referersItem) {
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

  public void setReferers(List<String> referers) {
    this.referers = referers;
  }

  public ApiKey validity(Integer validity) {
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

  public void setValidity(Integer validity) {
    this.validity = validity;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ApiKey apiKey = (ApiKey) o;
    return (
      Objects.equals(this.acl, apiKey.acl) &&
      Objects.equals(this.description, apiKey.description) &&
      Objects.equals(this.indexes, apiKey.indexes) &&
      Objects.equals(this.maxHitsPerQuery, apiKey.maxHitsPerQuery) &&
      Objects.equals(
        this.maxQueriesPerIPPerHour,
        apiKey.maxQueriesPerIPPerHour
      ) &&
      Objects.equals(this.queryParameters, apiKey.queryParameters) &&
      Objects.equals(this.referers, apiKey.referers) &&
      Objects.equals(this.validity, apiKey.validity)
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
      validity
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ApiKey {\n");
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
