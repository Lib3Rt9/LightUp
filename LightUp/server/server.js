// create a simple server
var port = 8000; // use 8000 as server port number

// Server code --------------------------------------------------------------
// use 'require' to load a function in a specific module
var wsServer = require("ws").Server,
    http = require("http").createServer().listen(port),
    httpServer = new wsServer({ port: port }).attach(http);
var server = new wsServer({ port: port });

// node.js server is event based
// listens to the connection event and handles it

// send the user count to all connected users
var User = require("./game").User; // import User
var Room = require("./game").Room; // import Room
var gameRoom = require("./game").gameRoom; // import gameRoom


// var room1 = new Room(); // create a new meeting room
var room1 = new gameRoom(); // create a new room

httpServer.on("connection", function(socket) {

    var user = new User(socket);
    
    console.log(`room1: ${JSON.stringify(room1)}`)
    
    room1.addUser(user);
    console.log("A connection established");

    // sends a server message to all connected clients
    // var message = "Welcome " + user.id + " joining the party. Total connection: " + room1.users.length;
    // room1.sendAll(message);

});


// a notification to ensure that server is running
console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");