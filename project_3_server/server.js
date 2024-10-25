const http = require('http');


const server = http.createServer(function(req, res) {

    if(req.url === '/test') {
        res.end("Hello World TEST");
    }

    console.log('Calling....');
    res.end("Hello World");
});

server.listen(7777);