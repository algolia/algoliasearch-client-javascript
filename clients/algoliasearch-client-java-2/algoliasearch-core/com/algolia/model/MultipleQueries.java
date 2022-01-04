package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.Objects;

/** MultipleQueries */
public class MultipleQueries {

  @SerializedName("indexName")
  private String indexName;

  @SerializedName("query")
  private String query = "";

  /** Perform a search query with `default`, will search for facet values if `facet` is given. */
  @JsonAdapter(TypeEnum.Adapter.class)
  public enum TypeEnum {
    DEFAULT("default"),

    FACET("facet");

    private String value;

    TypeEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static TypeEnum fromValue(String value) {
      for (TypeEnum b : TypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<TypeEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final TypeEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public TypeEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return TypeEnum.fromValue(value);
      }
    }
  }

  @SerializedName("type")
  private TypeEnum type = TypeEnum.DEFAULT;

  @SerializedName("facet")
  private String facet;

  @SerializedName("params")
  private String params;

  public MultipleQueries indexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * The Algolia index name.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  public void setIndexName(String indexName) {
    this.indexName = indexName;
  }

  public MultipleQueries query(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nullable
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public MultipleQueries type(TypeEnum type) {
    this.type = type;
    return this;
  }

  /**
   * Perform a search query with `default`, will search for facet values if `facet` is given.
   *
   * @return type
   */
  @javax.annotation.Nullable
  public TypeEnum getType() {
    return type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
  }

  public MultipleQueries facet(String facet) {
    this.facet = facet;
    return this;
  }

  /**
   * The `facet` name.
   *
   * @return facet
   */
  @javax.annotation.Nullable
  public String getFacet() {
    return facet;
  }

  public void setFacet(String facet) {
    this.facet = facet;
  }

  public MultipleQueries params(String params) {
    this.params = params;
    return this;
  }

  /**
   * A query string of search parameters.
   *
   * @return params
   */
  @javax.annotation.Nullable
  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MultipleQueries multipleQueries = (MultipleQueries) o;
    return (
      Objects.equals(this.indexName, multipleQueries.indexName) &&
      Objects.equals(this.query, multipleQueries.query) &&
      Objects.equals(this.type, multipleQueries.type) &&
      Objects.equals(this.facet, multipleQueries.facet) &&
      Objects.equals(this.params, multipleQueries.params)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(indexName, query, type, facet, params);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleQueries {\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    facet: ").append(toIndentedString(facet)).append("\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
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
