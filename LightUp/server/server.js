// create a new simple server
// use 8000 as server port number
var port = 8000;

// Server code
// use 'require' to load a function in a specific module
var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({ port: port });

// node.js server is event based
// listens to the connection event and handles it
server.on('connection', function(socket) {
    console.log("A connection established");
});

console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");