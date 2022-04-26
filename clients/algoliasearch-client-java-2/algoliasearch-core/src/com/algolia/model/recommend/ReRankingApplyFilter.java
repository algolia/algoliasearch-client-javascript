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

@JsonAdapter(ReRankingApplyFilter.Adapter.class)
public abstract class ReRankingApplyFilter implements CompoundType {

  public static ReRankingApplyFilter ofListListString(
    List<List<String>> inside
  ) {
    return new ReRankingApplyFilterListListString(inside);
  }

  public static ReRankingApplyFilter ofListString(List<String> inside) {
    return new ReRankingApplyFilterListString(inside);
  }

  public static class Adapter extends TypeAdapter<ReRankingApplyFilter> {

    @Override
    public void write(final JsonWriter out, final ReRankingApplyFilter oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public ReRankingApplyFilter read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(ReRankingApplyFilter.Adapter.class)
class ReRankingApplyFilterListListString extends ReRankingApplyFilter {

  private final List<List<String>> insideValue;

  ReRankingApplyFilterListListString(List<List<String>> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<List<String>> getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(ReRankingApplyFilter.Adapter.class)
class ReRankingApplyFilterListString extends ReRankingApplyFilter {

  private final List<String> insideValue;

  ReRankingApplyFilterListString(List<String> insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public List<String> getInsideValue() {
    return insideValue;
  }
}
