// eslint-disable-next-line import/no-commonjs
const http = require('http');
const port = '1111';

http
  .createServer(function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Access-Control-Allow-Origin': '*',
      'X-Powered-By': 'nodejs',
    });

    response.write('{');

    response.write('"foo":');

    setTimeout(() => {
      response.write(' "bar"');
    }, 1000);

    setTimeout(() => {
      response.write('}');
      response.end();
    }, 5000);
  })
  .listen(port);
