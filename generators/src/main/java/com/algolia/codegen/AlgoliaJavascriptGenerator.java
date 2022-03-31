package com.algolia.codegen;

import java.util.List;

import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.languages.TypeScriptNodeClientCodegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.servers.Server;

public class AlgoliaJavascriptGenerator extends TypeScriptNodeClientCodegen {
  @Override
  public String getName() {
    return "algolia-javascript";
  }

  @Override
  public CodegenOperation fromOperation(String path, String httpMethod, Operation operation, List<Server> servers) {
    return Utils.specifyCustomRequest(super.fromOperation(path, httpMethod, operation, servers));
  }
}
