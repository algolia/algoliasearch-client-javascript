package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Type of the synonym object. */
@JsonAdapter(SynonymType.Adapter.class)
public enum SynonymType {
  SYNONYM("synonym"),

  ONEWAYSYNONYM("onewaysynonym"),

  ALTCORRECTION1("altcorrection1"),

  ALTCORRECTION2("altcorrection2"),

  PLACEHOLDER("placeholder");

  private String value;

  SynonymType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static SynonymType fromValue(String value) {
    for (SynonymType b : SynonymType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<SynonymType> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final SynonymType enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public SynonymType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return SynonymType.fromValue(value);
    }
  }
}
