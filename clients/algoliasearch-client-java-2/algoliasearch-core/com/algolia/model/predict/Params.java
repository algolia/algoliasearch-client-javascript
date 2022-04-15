package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Object with models and types to retrieve. */
public class Params {

  @SerializedName("modelsToRetrieve")
  private List<ModelsToRetrieve> modelsToRetrieve = null;

  @SerializedName("typesToRetrieve")
  private List<TypesToRetrieve> typesToRetrieve = null;

  public Params setModelsToRetrieve(List<ModelsToRetrieve> modelsToRetrieve) {
    this.modelsToRetrieve = modelsToRetrieve;
    return this;
  }

  public Params addModelsToRetrieveItem(ModelsToRetrieve modelsToRetrieveItem) {
    if (this.modelsToRetrieve == null) {
      this.modelsToRetrieve = new ArrayList<>();
    }
    this.modelsToRetrieve.add(modelsToRetrieveItem);
    return this;
  }

  /**
   * List with model types for which to retrieve predictions.
   *
   * @return modelsToRetrieve
   */
  @javax.annotation.Nullable
  public List<ModelsToRetrieve> getModelsToRetrieve() {
    return modelsToRetrieve;
  }

  public Params setTypesToRetrieve(List<TypesToRetrieve> typesToRetrieve) {
    this.typesToRetrieve = typesToRetrieve;
    return this;
  }

  public Params addTypesToRetrieveItem(TypesToRetrieve typesToRetrieveItem) {
    if (this.typesToRetrieve == null) {
      this.typesToRetrieve = new ArrayList<>();
    }
    this.typesToRetrieve.add(typesToRetrieveItem);
    return this;
  }

  /**
   * List with types to be retrieved.
   *
   * @return typesToRetrieve
   */
  @javax.annotation.Nullable
  public List<TypesToRetrieve> getTypesToRetrieve() {
    return typesToRetrieve;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Params params = (Params) o;
    return (
      Objects.equals(this.modelsToRetrieve, params.modelsToRetrieve) &&
      Objects.equals(this.typesToRetrieve, params.typesToRetrieve)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(modelsToRetrieve, typesToRetrieve);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Params {\n");
    sb
      .append("    modelsToRetrieve: ")
      .append(toIndentedString(modelsToRetrieve))
      .append("\n");
    sb
      .append("    typesToRetrieve: ")
      .append(toIndentedString(typesToRetrieve))
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
