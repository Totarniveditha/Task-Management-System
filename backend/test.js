const http = require("http");

const server = http.createServer((req, res) => {


    console.log(req.url);
    console.log(req.method);
    res.setHeader("Content-Type", "text/plain");

    res.end("Hello from my Node server!");

});

server.listen(3000);