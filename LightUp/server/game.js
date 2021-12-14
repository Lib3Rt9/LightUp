// server logic
// constants to compare datatypes
var LINE_SEGMENT = 0;
var CHAT_MESSAGE = 1;
var GAME_LOGIC = 2;

// constants for game logic state
var WAITING_TO_START = 0;
var GAME_START = 1;
var GAME_OVER = 2;
var GAME_RESTART = 3; 


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



gameRoom.prototype = new Room();

// constructor - initialize game logic
function gameRoom() {

    // current turn
    this.playerTurn = 0;

    this.wordList = ["one", "two", "three", "four"];
    this.currentAnswer = undefined;

    this.currentGameState = WAITING_TO_START;


    // send game state to all players
    var gameLogicData ={
        dataType: GAME_LOGIC,
        gameState: WAITING_TO_START
    };
    console.log(this);
    this.sendAll(JSON.stringify(gameLogicData));

    

    gameRoom.prototype.addUser = function(user) {
            // a.k.a. super(user) in traditional OOP language.
            Room.prototype.addUser.call(this, user);
            
            // start the game if there are 2 or more connections
            if (this.currentGameState === WAITING_TO_START && this.users.length >= 2) {
                this.startGame();
            }
    };

    gameRoom.prototype.handleOnUserMessage = function(user) {
        var room = this;
        // handle on message
        user.socket.on("message", function(message){
            console.log("[gameRoom] Receive message from " + user.id + ": " + message); 
        
            var data = JSON.parse(message);
            if (data.dataType === CHAT_MESSAGE) {
                // add the sender information into the message data object.
                data.sender = user.id;
            }
            room.sendAll(JSON.stringify(data));
        
            // check if the message is guessing right or wrong
            if (data.dataType === CHAT_MESSAGE) {
                console.log("Current state: " + room.currentGameState);
                
                if (room.currentGameState === GAME_START) {
                    console.log("Got message: " + data.message + " (Answer: " + room.currentAnswer + ")");
                }
                
                if (room.currentGameState === GAME_START && data.message === room.currentAnswer) {
                    var gameLogicData = {
                        dataType: GAME_LOGIC,
                        gameState: GAME_OVER,
                        winner: user.id,
                        answer: room.currentAnswer
                    };
            
                    room.sendAll(JSON.stringify(gameLogicData));
            
                    room.currentGameState = WAITING_TO_START;
            
                    // clear the game over timeout
                    clearTimeout(room.gameOverTimeout);
                }
            }


            if (data.dataType === GAME_LOGIC && data.gameState === GAME_RESTART) {
                room.startGame();
            
            }
        });
    };

    gameRoom.prototype.startGame = function() {
        var room = this;
        
        // pick a player to draw
        this.playerTurn = (this.playerTurn+1) % this.users.length;
        
        console.log("Start game with player " + this.playerTurn + "'s turn.");
        
        // pick an answer
        var answerIndex = Math.floor(Math.random() * this.wordList.length);
        this.currentAnswer = this.wordList[answerIndex];
        
        // game start for all players
        var gameLogicDataForAllPlayers = {
            dataType: GAME_LOGIC,
            gameState: GAME_START,
            isPlayerTurn: false
        };
        
        this.sendAll(JSON.stringify(gameLogicDataForAllPlayers));
        
        // game start with answer to the player in turn.
        var gameLogicDataForDrawer = {
            dataType: GAME_LOGIC,
            gameState: GAME_START,
            answer: this.currentAnswer,
            isPlayerTurn: true
        };

        // the user who draws in this turn.
        var user = this.users[this.playerTurn];
        user.socket.send(JSON.stringify(gameLogicDataForDrawer));
        
    
        // game over the game after 1 minute.
        gameOverTimeout = setTimeout(function(){
            var gameLogicData = {
                dataType: GAME_LOGIC,
                gameState: GAME_OVER,
                winner: "No one",
                answer: room.currentAnswer
            };
    
            room.sendAll(JSON.stringify(gameLogicData));
    
            room.currentGameState = WAITING_TO_START;

        },60*1000);
        room.currentGameState = GAME_START;
    };
};


module.exports.gameRoom = gameRoom;