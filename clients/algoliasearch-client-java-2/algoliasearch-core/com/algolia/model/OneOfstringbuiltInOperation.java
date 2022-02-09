package com.algolia.model;

import com.google.gson.annotations.SerializedName;

public class OneOfstringbuiltInOperation {

  @SerializedName("_operation")
  private String _operation;

  @SerializedName("value")
  private String value;

  public void set_operation(String op) {
    _operation = op;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
