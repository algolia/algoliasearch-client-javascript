package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Consequence of the Rule. */
public class Consequence {

  @SerializedName("params")
  private ConsequenceParams params;

  @SerializedName("promote")
  private List<Promote> promote = null;

  @SerializedName("filterPromotes")
  private Boolean filterPromotes = false;

  @SerializedName("hide")
  private List<ConsequenceHide> hide = null;

  @SerializedName("userData")
  private Object userData;

  public Consequence params(ConsequenceParams params) {
    this.params = params;
    return this;
  }

  /**
   * Get params
   *
   * @return params
   */
  @javax.annotation.Nullable
  public ConsequenceParams getParams() {
    return params;
  }

  public void setParams(ConsequenceParams params) {
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
  public List<ConsequenceHide> getHide() {
    return hide;
  }

  public void setHide(List<ConsequenceHide> hide) {
    this.hide = hide;
  }

  public Consequence userData(Object userData) {
    this.userData = userData;
    return this;
  }

  /**
   * Custom JSON object that will be appended to the userData array in the response. This object
   * isn't interpreted by the API. It's limited to 1kB of minified JSON.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  public Object getUserData() {
    return userData;
  }

  public void setUserData(Object userData) {
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
