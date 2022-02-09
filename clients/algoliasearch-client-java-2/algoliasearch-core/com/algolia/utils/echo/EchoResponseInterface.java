package com.algolia.utils.echo;

import com.algolia.Pair;
import java.util.List;

public interface EchoResponseInterface {
  public String getPath();

  public String getMethod();

  public String getBody();

  public List<Pair> getQueryParams();
}
