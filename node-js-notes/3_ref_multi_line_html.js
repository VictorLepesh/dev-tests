const http = require('http')
const port = 8000;

http.createServer((request, response) => {
    response.write('<!DOCTYPE html>');
    response.write('<html lang="en-US">');
    response.write('Hello </br>');
    response.write('from html');
    response.end('</html>');
}).listen(port);