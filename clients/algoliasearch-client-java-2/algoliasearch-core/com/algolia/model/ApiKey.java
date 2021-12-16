package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Api Key object. */
@ApiModel(description = "Api Key object.")
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

  public static final String SERIALIZED_NAME_ACL = "acl";

  @SerializedName(SERIALIZED_NAME_ACL)
  private List<AclEnum> acl = new ArrayList<>();

  public static final String SERIALIZED_NAME_DESCRIPTION = "description";

  @SerializedName(SERIALIZED_NAME_DESCRIPTION)
  private String description = "";

  public static final String SERIALIZED_NAME_INDEXES = "indexes";

  @SerializedName(SERIALIZED_NAME_INDEXES)
  private List<String> indexes = null;

  public static final String SERIALIZED_NAME_MAX_HITS_PER_QUERY =
    "maxHitsPerQuery";

  @SerializedName(SERIALIZED_NAME_MAX_HITS_PER_QUERY)
  private Integer maxHitsPerQuery = 0;

  public static final String SERIALIZED_NAME_MAX_QUERIES_PER_I_P_PER_HOUR =
    "maxQueriesPerIPPerHour";

  @SerializedName(SERIALIZED_NAME_MAX_QUERIES_PER_I_P_PER_HOUR)
  private Integer maxQueriesPerIPPerHour = 0;

  public static final String SERIALIZED_NAME_QUERY_PARAMETERS =
    "queryParameters";

  @SerializedName(SERIALIZED_NAME_QUERY_PARAMETERS)
  private String queryParameters = "";

  public static final String SERIALIZED_NAME_REFERERS = "referers";

  @SerializedName(SERIALIZED_NAME_REFERERS)
  private List<String> referers = null;

  public static final String SERIALIZED_NAME_VALIDITY = "validity";

  @SerializedName(SERIALIZED_NAME_VALIDITY)
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
  @ApiModelProperty(
    required = true,
    value = "Set of permissions associated with the key."
  )
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
  @ApiModelProperty(
    value = "A comment used to identify a key more easily in the dashboard. It is not interpreted by" +
    " the API."
  )
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
  @ApiModelProperty(
    value = "Restrict this new API key to a list of indices or index patterns. If the list is empty," +
    " all indices are allowed."
  )
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
  @ApiModelProperty(
    value = "Maximum number of hits this API key can retrieve in one query. If zero, no limit is" +
    " enforced."
  )
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
  @ApiModelProperty(
    value = "Maximum number of API calls per hour allowed from a given IP address or a user token."
  )
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
  @ApiModelProperty(
    value = "URL-encoded query string. Force some query parameters to be applied for each query made" +
    " with this API key."
  )
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
  @ApiModelProperty(
    value = "Restrict this new API key to specific referers. If empty or blank, defaults to all" +
    " referers."
  )
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
  @ApiModelProperty(
    value = "Validity limit for this key in seconds. The key will automatically be removed after this" +
    " period of time."
  )
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
