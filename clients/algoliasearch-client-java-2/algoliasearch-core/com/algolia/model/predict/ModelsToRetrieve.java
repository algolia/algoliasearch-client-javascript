package com.algolia.model.predict;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets modelsToRetrieve */
@JsonAdapter(ModelsToRetrieve.Adapter.class)
public enum ModelsToRetrieve {
  FUNNEL_STAGE("funnel_stage"),

  ORDER_VALUE("order_value"),

  AFFINITIES("affinities");

  private final String value;

  ModelsToRetrieve(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static ModelsToRetrieve fromValue(String value) {
    for (ModelsToRetrieve b : ModelsToRetrieve.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<ModelsToRetrieve> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final ModelsToRetrieve enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public ModelsToRetrieve read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return ModelsToRetrieve.fromValue(value);
    }
  }
}
