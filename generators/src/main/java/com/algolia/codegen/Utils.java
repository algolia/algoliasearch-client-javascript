package com.algolia.codegen;

import com.google.common.collect.Sets;
import java.util.Set;
import org.openapitools.codegen.CodegenOperation;

public class Utils {

  /** The suffix of our client names. */
  public static final String API_SUFFIX = "Client";

  public static final Set<String> CUSTOM_METHOD = Sets.newHashSet(
    "del",
    "get",
    "post",
    "put"
  );

  public static String capitalize(String str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

  /**
   * Will add the boolean `vendorExtensions.x-is-custom-request` to operations if they should not
   * escape '/' in the path variable
   */
  public static CodegenOperation specifyCustomRequest(CodegenOperation ope) {
    if (CUSTOM_METHOD.contains(ope.nickname)) {
      ope.vendorExtensions.put("x-is-custom-request", true);
    }
    return ope;
  }

  /** Returns the client name for the given language */
  public static String createClientName(String client, String language) {
    String[] clientParts = client.split("-");
    String clientName = "";
    if (language.equals("javascript")) {
      // do not capitalize the first part
      clientName = clientParts[0].toLowerCase();
      for (int i = 1; i < clientParts.length; i++) {
        clientName += capitalize(clientParts[i]);
      }
    } else {
      for (int i = 0; i < clientParts.length; i++) {
        clientName += capitalize(clientParts[i]);
      }
    }

    return clientName;
  }
}
