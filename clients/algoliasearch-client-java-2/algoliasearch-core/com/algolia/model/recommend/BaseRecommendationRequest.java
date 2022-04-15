package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BaseRecommendationRequest */
public class BaseRecommendationRequest {

  @SerializedName("model")
  private RecommendationModels model;

  @SerializedName("objectID")
  private String objectID;

  public BaseRecommendationRequest setModel(RecommendationModels model) {
    this.model = model;
    return this;
  }

  /**
   * Get model
   *
   * @return model
   */
  @javax.annotation.Nonnull
  public RecommendationModels getModel() {
    return model;
  }

  public BaseRecommendationRequest setObjectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseRecommendationRequest baseRecommendationRequest = (BaseRecommendationRequest) o;
    return (
      Objects.equals(this.model, baseRecommendationRequest.model) &&
      Objects.equals(this.objectID, baseRecommendationRequest.objectID)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(model, objectID);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseRecommendationRequest {\n");
    sb.append("    model: ").append(toIndentedString(model)).append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
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
