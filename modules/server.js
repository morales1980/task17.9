var http = require('http');
var color = require('colors');

var handlers = require('./handlers');

function start() {
  function onRequest(request, response) {
    console.log('Request received.'.green);
    console.log('Request ' + request.url.bgRed + ' received.');

    response.writeHead(200, {'Content-Type': 'text-plain; charset=utf-8'});

    if(request.url.includes('/show')) {
      handlers.show(request, response);

      return;
    }

    switch (request.url) {
      case '/':
      case '/start':
        handlers.welcome(request, response);
        break;
      case '/upload':
        handlers.upload(request, response);
        break;
      case '/uploadcss':
        handlers.uploadcss(request, response);
        break;
      default:
        handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log('Server initialized!'.green.bgBlue);
}

exports.start = start;
