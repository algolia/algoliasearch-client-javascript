package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Properties for the user profile. */
public class Properties {

  @SerializedName("raw")
  private Object raw;

  @SerializedName("computed")
  private Object computed;

  @SerializedName("custom")
  private Object custom;

  public Properties setRaw(Object raw) {
    this.raw = raw;
    return this;
  }

  /**
   * Raw user properties (key-value pairs).
   *
   * @return raw
   */
  @javax.annotation.Nullable
  public Object getRaw() {
    return raw;
  }

  public Properties setComputed(Object computed) {
    this.computed = computed;
    return this;
  }

  /**
   * Computed user properties (key-value pairs).
   *
   * @return computed
   */
  @javax.annotation.Nullable
  public Object getComputed() {
    return computed;
  }

  public Properties setCustom(Object custom) {
    this.custom = custom;
    return this;
  }

  /**
   * Custom user properties (key-value pairs).
   *
   * @return custom
   */
  @javax.annotation.Nullable
  public Object getCustom() {
    return custom;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Properties properties = (Properties) o;
    return (
      Objects.equals(this.raw, properties.raw) &&
      Objects.equals(this.computed, properties.computed) &&
      Objects.equals(this.custom, properties.custom)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(raw, computed, custom);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Properties {\n");
    sb.append("    raw: ").append(toIndentedString(raw)).append("\n");
    sb.append("    computed: ").append(toIndentedString(computed)).append("\n");
    sb.append("    custom: ").append(toIndentedString(custom)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
