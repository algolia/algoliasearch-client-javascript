package com.algolia.codegen;

import java.util.Set;

import com.google.common.collect.Sets;

import org.openapitools.codegen.CodegenOperation;

public class Utils {
  public static final Set<String> CUSTOM_METHOD = Sets.newHashSet("del", "get", "post", "put");

  public static String capitalize(String str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

  /**
   * Will add the boolean `vendorExtensions.x-is-custom-request` to operations if
   * they should not escape '/' in the path variable
   */
  public static CodegenOperation specifyCustomRequest(CodegenOperation ope) {
    if (CUSTOM_METHOD.contains(ope.nickname)) {
      ope.vendorExtensions.put("x-is-custom-request", true);
    }
    return ope;
  }
}
