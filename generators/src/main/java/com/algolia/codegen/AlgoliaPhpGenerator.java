package com.algolia.codegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.languages.PhpClientCodegen;

public class AlgoliaPhpGenerator extends PhpClientCodegen {

  @Override
  public String getName() {
    return "algolia-php";
  }

  @Override
  public CodegenOperation fromOperation(
    String path,
    String httpMethod,
    Operation operation,
    List<Server> servers
  ) {
    return Utils.specifyCustomRequest(
      super.fromOperation(path, httpMethod, operation, servers)
    );
  }
}
