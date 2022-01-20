package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Indice */
public class Indice {

  @SerializedName("name")
  private String name;

  @SerializedName("createdAt")
  private String createdAt;

  @SerializedName("updatedAt")
  private String updatedAt;

  @SerializedName("entries")
  private Integer entries;

  @SerializedName("dataSize")
  private Integer dataSize;

  @SerializedName("fileSize")
  private Integer fileSize;

  @SerializedName("lastBuildTimeS")
  private Integer lastBuildTimeS;

  @SerializedName("numberOfPendingTask")
  private Integer numberOfPendingTask;

  @SerializedName("pendingTask")
  private Boolean pendingTask;

  @SerializedName("primary")
  private String primary;

  @SerializedName("replicas")
  private List<String> replicas = null;

  public Indice name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Index name.
   *
   * @return name
   */
  @javax.annotation.Nonnull
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Indice createdAt(String createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Index creation date. An empty string means that the index has no records.
   *
   * @return createdAt
   */
  @javax.annotation.Nonnull
  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public Indice updatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Date of last update (ISO-8601 format).
   *
   * @return updatedAt
   */
  @javax.annotation.Nonnull
  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Indice entries(Integer entries) {
    this.entries = entries;
    return this;
  }

  /**
   * Number of records contained in the index.
   *
   * @return entries
   */
  @javax.annotation.Nonnull
  public Integer getEntries() {
    return entries;
  }

  public void setEntries(Integer entries) {
    this.entries = entries;
  }

  public Indice dataSize(Integer dataSize) {
    this.dataSize = dataSize;
    return this;
  }

  /**
   * Number of bytes of the index in minified format.
   *
   * @return dataSize
   */
  @javax.annotation.Nonnull
  public Integer getDataSize() {
    return dataSize;
  }

  public void setDataSize(Integer dataSize) {
    this.dataSize = dataSize;
  }

  public Indice fileSize(Integer fileSize) {
    this.fileSize = fileSize;
    return this;
  }

  /**
   * Number of bytes of the index binary file.
   *
   * @return fileSize
   */
  @javax.annotation.Nonnull
  public Integer getFileSize() {
    return fileSize;
  }

  public void setFileSize(Integer fileSize) {
    this.fileSize = fileSize;
  }

  public Indice lastBuildTimeS(Integer lastBuildTimeS) {
    this.lastBuildTimeS = lastBuildTimeS;
    return this;
  }

  /**
   * Last build time
   *
   * @return lastBuildTimeS
   */
  @javax.annotation.Nonnull
  public Integer getLastBuildTimeS() {
    return lastBuildTimeS;
  }

  public void setLastBuildTimeS(Integer lastBuildTimeS) {
    this.lastBuildTimeS = lastBuildTimeS;
  }

  public Indice numberOfPendingTask(Integer numberOfPendingTask) {
    this.numberOfPendingTask = numberOfPendingTask;
    return this;
  }

  /**
   * Number of pending indexing operations. This value is deprecated and should not be used.
   *
   * @return numberOfPendingTask
   */
  @javax.annotation.Nullable
  public Integer getNumberOfPendingTask() {
    return numberOfPendingTask;
  }

  public void setNumberOfPendingTask(Integer numberOfPendingTask) {
    this.numberOfPendingTask = numberOfPendingTask;
  }

  public Indice pendingTask(Boolean pendingTask) {
    this.pendingTask = pendingTask;
    return this;
  }

  /**
   * A boolean which says whether the index has pending tasks. This value is deprecated and should
   * not be used.
   *
   * @return pendingTask
   */
  @javax.annotation.Nonnull
  public Boolean getPendingTask() {
    return pendingTask;
  }

  public void setPendingTask(Boolean pendingTask) {
    this.pendingTask = pendingTask;
  }

  public Indice primary(String primary) {
    this.primary = primary;
    return this;
  }

  /**
   * Only present if the index is a replica. Contains the name of the related primary index.
   *
   * @return primary
   */
  @javax.annotation.Nullable
  public String getPrimary() {
    return primary;
  }

  public void setPrimary(String primary) {
    this.primary = primary;
  }

  public Indice replicas(List<String> replicas) {
    this.replicas = replicas;
    return this;
  }

  public Indice addReplicasItem(String replicasItem) {
    if (this.replicas == null) {
      this.replicas = new ArrayList<>();
    }
    this.replicas.add(replicasItem);
    return this;
  }

  /**
   * Only present if the index is a primary index with replicas. Contains the names of all linked
   * replicas.
   *
   * @return replicas
   */
  @javax.annotation.Nullable
  public List<String> getReplicas() {
    return replicas;
  }

  public void setReplicas(List<String> replicas) {
    this.replicas = replicas;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Indice indice = (Indice) o;
    return (
      Objects.equals(this.name, indice.name) &&
      Objects.equals(this.createdAt, indice.createdAt) &&
      Objects.equals(this.updatedAt, indice.updatedAt) &&
      Objects.equals(this.entries, indice.entries) &&
      Objects.equals(this.dataSize, indice.dataSize) &&
      Objects.equals(this.fileSize, indice.fileSize) &&
      Objects.equals(this.lastBuildTimeS, indice.lastBuildTimeS) &&
      Objects.equals(this.numberOfPendingTask, indice.numberOfPendingTask) &&
      Objects.equals(this.pendingTask, indice.pendingTask) &&
      Objects.equals(this.primary, indice.primary) &&
      Objects.equals(this.replicas, indice.replicas)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      name,
      createdAt,
      updatedAt,
      entries,
      dataSize,
      fileSize,
      lastBuildTimeS,
      numberOfPendingTask,
      pendingTask,
      primary,
      replicas
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Indice {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb
      .append("    createdAt: ")
      .append(toIndentedString(createdAt))
      .append("\n");
    sb
      .append("    updatedAt: ")
      .append(toIndentedString(updatedAt))
      .append("\n");
    sb.append("    entries: ").append(toIndentedString(entries)).append("\n");
    sb.append("    dataSize: ").append(toIndentedString(dataSize)).append("\n");
    sb.append("    fileSize: ").append(toIndentedString(fileSize)).append("\n");
    sb
      .append("    lastBuildTimeS: ")
      .append(toIndentedString(lastBuildTimeS))
      .append("\n");
    sb
      .append("    numberOfPendingTask: ")
      .append(toIndentedString(numberOfPendingTask))
      .append("\n");
    sb
      .append("    pendingTask: ")
      .append(toIndentedString(pendingTask))
      .append("\n");
    sb.append("    primary: ").append(toIndentedString(primary)).append("\n");
    sb.append("    replicas: ").append(toIndentedString(replicas)).append("\n");
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
