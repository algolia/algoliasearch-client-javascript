package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets alternativesAsExact */
@JsonAdapter(AlternativesAsExact.Adapter.class)
public enum AlternativesAsExact {
  IGNORE_PLURALS("ignorePlurals"),

  SINGLE_WORD_SYNONYM("singleWordSynonym"),

  MULTI_WORDS_SYNONYM("multiWordsSynonym");

  private final String value;

  AlternativesAsExact(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static AlternativesAsExact fromValue(String value) {
    for (AlternativesAsExact b : AlternativesAsExact.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<AlternativesAsExact> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final AlternativesAsExact enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public AlternativesAsExact read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return AlternativesAsExact.fromValue(value);
    }
  }
}
