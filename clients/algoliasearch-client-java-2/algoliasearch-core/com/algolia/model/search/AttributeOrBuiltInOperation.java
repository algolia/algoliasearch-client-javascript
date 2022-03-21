package com.algolia.model.search;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(AttributeOrBuiltInOperation.Adapter.class)
public abstract class AttributeOrBuiltInOperation implements CompoundType {

  public static AttributeOrBuiltInOperation ofBuiltInOperation(
    BuiltInOperation inside
  ) {
    return new AttributeOrBuiltInOperationBuiltInOperation(inside);
  }

  public static AttributeOrBuiltInOperation ofString(String inside) {
    return new AttributeOrBuiltInOperationString(inside);
  }

  public abstract Object getInsideValue();

  public static class Adapter extends TypeAdapter<AttributeOrBuiltInOperation> {

    @Override
    public void write(
      final JsonWriter out,
      final AttributeOrBuiltInOperation oneOf
    ) throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public AttributeOrBuiltInOperation read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(AttributeOrBuiltInOperation.Adapter.class)
class AttributeOrBuiltInOperationBuiltInOperation
  extends AttributeOrBuiltInOperation {

  private final BuiltInOperation insideValue;

  AttributeOrBuiltInOperationBuiltInOperation(BuiltInOperation insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public BuiltInOperation getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(AttributeOrBuiltInOperation.Adapter.class)
class AttributeOrBuiltInOperationString extends AttributeOrBuiltInOperation {

  private final String insideValue;

  AttributeOrBuiltInOperationString(String insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public String getInsideValue() {
    return insideValue;
  }
}
