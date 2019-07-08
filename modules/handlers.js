var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
  console.log('Started upload request processing.');

  var form = new formidable.IncomingForm();
  form.uploadDir = '.';
  form.parse(request, function(error, fields, files) {
    if(error) throw error;
    console.log(files);
    debugger
    fs.renameSync(files.upload.path, files.upload.name);

    fs.readFile('templates/upload.html', 'utf8', function(error, htmlTemplate) {
      if(error) throw error;
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      var sourcedHtml = htmlTemplate.replace('/show', '/show/' + files.upload.name);
      response.write(sourcedHtml);
      response.end();
    });
  });
}

exports.uploadcss = function(request, response) {
  fs.readFile('templates/style.css', function(error, css) {
    if(error) throw error;
    response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
    response.write(css);
    response.end();
  });
}

exports.show = function(request, response) {
  var fileName = request.url.replace('/show/', '');
  fs.readFile(fileName, 'binary', function(error, file) {

    if(error) throw error;
    response.writeHead(200, {'Content-Type': 'image/png'});
    response.write(file, 'binary');
    response.end();
  });
}

exports.welcome = function(request, response) {
  console.log('Started welcome request processing.');

  fs.readFile('templates/start.html', function(error, html) {
    if(error) throw error;
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(html);
    response.end();
  });
}

exports.error = function(request, response) {
  console.log("Don't know what to do...");

  response.write('404 :(');
  response.end();
}
