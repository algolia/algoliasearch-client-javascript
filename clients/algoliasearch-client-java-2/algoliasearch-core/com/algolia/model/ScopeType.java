package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets scopeType */
@JsonAdapter(ScopeType.Adapter.class)
public enum ScopeType {
  SETTINGS("settings"),

  SYNONYMS("synonyms"),

  RULES("rules");

  private String value;

  ScopeType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static ScopeType fromValue(String value) {
    for (ScopeType b : ScopeType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<ScopeType> {

    @Override
    public void write(final JsonWriter jsonWriter, final ScopeType enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public ScopeType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return ScopeType.fromValue(value);
    }
  }
}
