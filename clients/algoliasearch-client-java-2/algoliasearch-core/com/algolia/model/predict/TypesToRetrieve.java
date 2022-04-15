package com.algolia.model.predict;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets typesToRetrieve */
@JsonAdapter(TypesToRetrieve.Adapter.class)
public enum TypesToRetrieve {
  PROPERTIES("properties"),

  SEGMENTS("segments");

  private final String value;

  TypesToRetrieve(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static TypesToRetrieve fromValue(String value) {
    for (TypesToRetrieve b : TypesToRetrieve.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<TypesToRetrieve> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final TypesToRetrieve enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public TypesToRetrieve read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return TypesToRetrieve.fromValue(value);
    }
  }
}
