package com.algolia.codegen;

import java.util.List;

import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.languages.PhpClientCodegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.servers.Server;

public class AlgoliaPhpGenerator extends PhpClientCodegen {
  @Override
  public String getName() {
    return "algolia-php";
  }

  @Override
  public CodegenOperation fromOperation(String path, String httpMethod, Operation operation, List<Server> servers) {
    return Utils.specifyCustomRequest(super.fromOperation(path, httpMethod, operation, servers));
  }
}
