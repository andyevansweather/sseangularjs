var SSE = require('sse')
    , http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    res.end('okay');
});

server.listen(8080, '0.0.0.0', function() {
    var sse = new SSE(server);
    sse.on('connection', function(client) {
        client.send('hi there!');
    });
});