package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** Consequence of the Rule. */
@ApiModel(description = "Consequence of the Rule.")
public class Consequence {

  public static final String SERIALIZED_NAME_PARAMS = "params";

  @SerializedName(SERIALIZED_NAME_PARAMS)
  private Params params;

  public static final String SERIALIZED_NAME_PROMOTE = "promote";

  @SerializedName(SERIALIZED_NAME_PROMOTE)
  private List<Promote> promote = null;

  public static final String SERIALIZED_NAME_FILTER_PROMOTES = "filterPromotes";

  @SerializedName(SERIALIZED_NAME_FILTER_PROMOTES)
  private Boolean filterPromotes = false;

  public static final String SERIALIZED_NAME_HIDE = "hide";

  @SerializedName(SERIALIZED_NAME_HIDE)
  private List<ConsequenceHide> hide = null;

  public static final String SERIALIZED_NAME_USER_DATA = "userData";

  @SerializedName(SERIALIZED_NAME_USER_DATA)
  private Map<String, Object> userData = null;

  public Consequence params(Params params) {
    this.params = params;
    return this;
  }

  /**
   * Get params
   *
   * @return params
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public Params getParams() {
    return params;
  }

  public void setParams(Params params) {
    this.params = params;
  }

  public Consequence promote(List<Promote> promote) {
    this.promote = promote;
    return this;
  }

  public Consequence addPromoteItem(Promote promoteItem) {
    if (this.promote == null) {
      this.promote = new ArrayList<>();
    }
    this.promote.add(promoteItem);
    return this;
  }

  /**
   * Objects to promote as hits.
   *
   * @return promote
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Objects to promote as hits.")
  public List<Promote> getPromote() {
    return promote;
  }

  public void setPromote(List<Promote> promote) {
    this.promote = promote;
  }

  public Consequence filterPromotes(Boolean filterPromotes) {
    this.filterPromotes = filterPromotes;
    return this;
  }

  /**
   * Only use in combination with the promote consequence. When true, promoted results will be
   * restricted to match the filters of the current search. When false, the promoted results will
   * show up regardless of the filters.
   *
   * @return filterPromotes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Only use in combination with the promote consequence. When true, promoted results will" +
    " be restricted to match the filters of the current search. When false, the" +
    " promoted results will show up regardless of the filters."
  )
  public Boolean getFilterPromotes() {
    return filterPromotes;
  }

  public void setFilterPromotes(Boolean filterPromotes) {
    this.filterPromotes = filterPromotes;
  }

  public Consequence hide(List<ConsequenceHide> hide) {
    this.hide = hide;
    return this;
  }

  public Consequence addHideItem(ConsequenceHide hideItem) {
    if (this.hide == null) {
      this.hide = new ArrayList<>();
    }
    this.hide.add(hideItem);
    return this;
  }

  /**
   * Objects to hide from hits. Each object must contain an objectID field. By default, you can hide
   * up to 50 items per rule.
   *
   * @return hide
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Objects to hide from hits. Each object must contain an objectID field. By default, you" +
    " can hide up to 50 items per rule."
  )
  public List<ConsequenceHide> getHide() {
    return hide;
  }

  public void setHide(List<ConsequenceHide> hide) {
    this.hide = hide;
  }

  public Consequence userData(Map<String, Object> userData) {
    this.userData = userData;
    return this;
  }

  public Consequence putUserDataItem(String key, Object userDataItem) {
    if (this.userData == null) {
      this.userData = new HashMap<>();
    }
    this.userData.put(key, userDataItem);
    return this;
  }

  /**
   * Custom JSON object that will be appended to the userData array in the response. This object
   * isn't interpreted by the API. It's limited to 1kB of minified JSON.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Custom JSON object that will be appended to the userData array in the response. This" +
    " object isn't interpreted by the API. It's limited to 1kB of minified JSON."
  )
  public Map<String, Object> getUserData() {
    return userData;
  }

  public void setUserData(Map<String, Object> userData) {
    this.userData = userData;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Consequence consequence = (Consequence) o;
    return (
      Objects.equals(this.params, consequence.params) &&
      Objects.equals(this.promote, consequence.promote) &&
      Objects.equals(this.filterPromotes, consequence.filterPromotes) &&
      Objects.equals(this.hide, consequence.hide) &&
      Objects.equals(this.userData, consequence.userData)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(params, promote, filterPromotes, hide, userData);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Consequence {\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
    sb.append("    promote: ").append(toIndentedString(promote)).append("\n");
    sb
      .append("    filterPromotes: ")
      .append(toIndentedString(filterPromotes))
      .append("\n");
    sb.append("    hide: ").append(toIndentedString(hide)).append("\n");
    sb.append("    userData: ").append(toIndentedString(userData)).append("\n");
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
