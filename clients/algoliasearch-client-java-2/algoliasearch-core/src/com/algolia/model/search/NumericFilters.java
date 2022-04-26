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

@JsonAdapter(NumericFilters.Adapter.class)
public abstract class NumericFilters implements CompoundType {

  public static NumericFilters ofListListString(List<List<String>> inside) {
    return new NumericFiltersListListString(inside);
  }

  public static NumericFilters ofListString(List<String> inside) {
    return new NumericFiltersListString(inside);
  }

  public static class Adapter extends TypeAdapter<NumericFilters> {

    @Override
    public void write(final JsonWriter out, final NumericFilters oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public NumericFilters read(final JsonReader jsonReader) throws IOException {
      return null;
    }
  }
}

@JsonAdapter(NumericFilters.Adapter.class)
class NumericFiltersListListString extends NumericFilters {

  private final List<List<String>> insideValue;

  NumericFiltersListListString(List<List<String>> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<List<String>> getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(NumericFilters.Adapter.class)
class NumericFiltersListString extends NumericFilters {

  private final List<String> insideValue;

  NumericFiltersListString(List<String> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<String> getInsideValue() {
    return insideValue;
  }
}
