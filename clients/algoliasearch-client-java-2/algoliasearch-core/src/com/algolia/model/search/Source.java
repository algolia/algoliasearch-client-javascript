package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** The source. */
public class Source {

  @SerializedName("source")
  private String source;

  @SerializedName("description")
  private String description;

  public Source setSource(String source) {
    this.source = source;
    return this;
  }

  /**
   * The IP range of the source.
   *
   * @return source
   */
  @javax.annotation.Nonnull
  public String getSource() {
    return source;
  }

  public Source setDescription(String description) {
    this.description = description;
    return this;
  }

  /**
   * The description of the source.
   *
   * @return description
   */
  @javax.annotation.Nullable
  public String getDescription() {
    return description;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Source source = (Source) o;
    return (
      Objects.equals(this.source, source.source) &&
      Objects.equals(this.description, source.description)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(source, description);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Source {\n");
    sb.append("    source: ").append(toIndentedString(source)).append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
      .append("\n");
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
