package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets advancedSyntaxFeatures */
@JsonAdapter(AdvancedSyntaxFeatures.Adapter.class)
public enum AdvancedSyntaxFeatures {
  EXACT_PHRASE("exactPhrase"),

  EXCLUDE_WORDS("excludeWords");

  private final String value;

  AdvancedSyntaxFeatures(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static AdvancedSyntaxFeatures fromValue(String value) {
    for (AdvancedSyntaxFeatures b : AdvancedSyntaxFeatures.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<AdvancedSyntaxFeatures> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final AdvancedSyntaxFeatures enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public AdvancedSyntaxFeatures read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return AdvancedSyntaxFeatures.fromValue(value);
    }
  }
}
