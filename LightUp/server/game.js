// server logic
// constants to compare datatypes
var LINE_SEGMENT = 0;
var CHAT_MESSAGE = 1;

// store game and logic, manage all connected sockets
// store socket connection objects and create random ID
function User(socket) {

    this.socket = socket;

    // assign a random number to User.
    // long enough to make duplication chance less.
    this.id = "1" + Math.floor( Math.random() * 1000000000);
   }

// store a collection of user instances
function Room() {

    this.users = []; // all users
    
    // manages the adding and removing of users
    Room.prototype.addUser = function(user){
        this.users.push(user);
        var room = this;
        
        // now handle messages from game.js, not server.js anymore
        // tell others that someone joins the room
        var data = {
            dataType: CHAT_MESSAGE,
            sender: "Server",
            message: "Welcome " + user.id + " joining the party. Total connection: " + this.users.length
        };
        room.sendAll(JSON.stringify(data));

        // handle user closing
        user.socket.onclose = function(){
            console.log("A connection left.");
            room.removeUser(user);
        }

        // call message handler
        this.handleOnUserMessage(user);
    };

    Room.prototype.removeUser = function(user) {
        // loop to find the user
        for (var i=this.users.length; i >= 0; i--) {
            if (this.users[i] === user) {
                this.users.splice(i, 1);
            }
        }
    };

    // sending messages to all the connected users in the room
    Room.prototype.sendAll = function(message) {
        for (var i=0, len=this.users.length; i<len; i++) {
            this.users[i].socket.send(message);
        }
    };

    // handles user messages
    Room.prototype.handleOnUserMessage = function(user) {
        var room = this;

        // send message to all clients
        user.socket.on("message", function(message){
            console.log("Receive message from " + user.id + ": " + message); 
            
            // use JSON-formatted string for communicating both drawing actions and chat messages
            // construct the message
            var data = JSON.parse(message); //  parse to JavaScript object
            if (data.dataType === CHAT_MESSAGE) {
                // add the sender information into the message data object.
                data.sender = user.id;
            }

            // send to all clients in room.
            room.sendAll(JSON.stringify(data));

        });
        
    };
};


// define User and Room classes to let other files use them
module.exports.User = User;
module.exports.Room = Room;