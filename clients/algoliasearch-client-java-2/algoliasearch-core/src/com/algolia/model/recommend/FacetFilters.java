package com.algolia.model.recommend;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.List;

@JsonAdapter(FacetFilters.Adapter.class)
public abstract class FacetFilters implements CompoundType {

  public static FacetFilters ofListListString(List<List<String>> inside) {
    return new FacetFiltersListListString(inside);
  }

  public static FacetFilters ofListString(List<String> inside) {
    return new FacetFiltersListString(inside);
  }

  public static class Adapter extends TypeAdapter<FacetFilters> {

    @Override
    public void write(final JsonWriter out, final FacetFilters oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public FacetFilters read(final JsonReader jsonReader) throws IOException {
      return null;
    }
  }
}

@JsonAdapter(FacetFilters.Adapter.class)
class FacetFiltersListListString extends FacetFilters {

  private final List<List<String>> insideValue;

  FacetFiltersListListString(List<List<String>> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<List<String>> getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(FacetFilters.Adapter.class)
class FacetFiltersListString extends FacetFilters {

  private final List<String> insideValue;

  FacetFiltersListString(List<String> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<String> getInsideValue() {
    return insideValue;
  }
}
