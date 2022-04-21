package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Controls if and how query words are interpreted as prefixes. */
@JsonAdapter(QueryType.Adapter.class)
public enum QueryType {
  PREFIX_LAST("prefixLast"),

  PREFIX_ALL("prefixAll"),

  PREFIX_NONE("prefixNone");

  private final String value;

  QueryType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static QueryType fromValue(String value) {
    for (QueryType b : QueryType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<QueryType> {

    @Override
    public void write(final JsonWriter jsonWriter, final QueryType enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public QueryType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return QueryType.fromValue(value);
    }
  }
}
