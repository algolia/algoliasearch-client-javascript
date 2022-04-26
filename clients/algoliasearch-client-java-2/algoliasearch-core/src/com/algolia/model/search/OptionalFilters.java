package com.algolia.model.search;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.List;

@JsonAdapter(OptionalFilters.Adapter.class)
public abstract class OptionalFilters implements CompoundType {

  public static OptionalFilters ofListListString(List<List<String>> inside) {
    return new OptionalFiltersListListString(inside);
  }

  public static OptionalFilters ofListString(List<String> inside) {
    return new OptionalFiltersListString(inside);
  }

  public static class Adapter extends TypeAdapter<OptionalFilters> {

    @Override
    public void write(final JsonWriter out, final OptionalFilters oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public OptionalFilters read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(OptionalFilters.Adapter.class)
class OptionalFiltersListListString extends OptionalFilters {

  private final List<List<String>> insideValue;

  OptionalFiltersListListString(List<List<String>> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<List<String>> getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(OptionalFilters.Adapter.class)
class OptionalFiltersListString extends OptionalFilters {

  private final List<String> insideValue;

  OptionalFiltersListString(List<String> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<String> getInsideValue() {
    return insideValue;
  }
}
