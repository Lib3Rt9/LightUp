// store game and logic
// manage all connected sockets
// store socket connection objects and create random ID
function User(socket) {
    this.socket = socket; 
    // assign a random number to User.
    // Long enough to make duplication chance less.
    this.id = "1" + Math.floor( Math.random() * 1000000000);
   }

// store a collection of user instances
function Room() {
    this.users = [];
    
    // manages the adding and removing of users
    Room.prototype.addUser = function(user){
        this.users.push(user);
        var room = this;
        
        this.handleOnUserMessage(user);
        // handle user closing
        user.socket.onclose = function(){
            console.log('A connection left.');
            room.removeUser(user);
        }

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
        user.socket.on("message", function(message){
            console.log("Receive message from " + user.id + ": " + message);
        });
        socket.on("message", function(message){
            console.log("Receive message: " + message);
        });
    };
};



// define User and Room classes to let other files use them
module.exports.User = User;
module.exports.Room = Room;