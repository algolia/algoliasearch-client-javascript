package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** The trending model to use. */
@JsonAdapter(TrendingModels.Adapter.class)
public enum TrendingModels {
  FACETS("trending-facets"),

  ITEMS("trending-items");

  private final String value;

  TrendingModels(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static TrendingModels fromValue(String value) {
    for (TrendingModels b : TrendingModels.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<TrendingModels> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final TrendingModels enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public TrendingModels read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return TrendingModels.fromValue(value);
    }
  }
}
