package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets dictionaryType */
@JsonAdapter(DictionaryType.Adapter.class)
public enum DictionaryType {
  PLURALS("plurals"),

  STOPWORDS("stopwords"),

  COMPOUNDS("compounds");

  private final String value;

  DictionaryType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static DictionaryType fromValue(String value) {
    for (DictionaryType b : DictionaryType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<DictionaryType> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final DictionaryType enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public DictionaryType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return DictionaryType.fromValue(value);
    }
  }
}
