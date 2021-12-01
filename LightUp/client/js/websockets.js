// response to the server

// drawing logic
var wsGame = {
    // constants to compare datatypes
    LINE_SEGMENT : 0,
    CHAT_MESSAGE : 1,
    GAME_LOGIC : 2, // handle the game logic, contains different data for different game states
    
    // some constant for game logic state
    WAITING_TO_START : 0,
    GAME_START : 1,
    GAME_OVER : 2,
    GAME_RESTART : 3,

    // indicates if it is drawing now.
    isDrawing : false,
    isTurnToDraw : false, // indicate the player is in charge of drawing
    
    // the starting point of next line drawing.
    startX : 0,
    startY : 0,
}

// canvas context
var canvas = document.getElementById("drawing-pad");
var ctx = canvas.getContext("2d"); // context

// -----------------------------------------------------------------------
// init script when the DOM is ready.
$(function(){
    // check if existence of WebSockets in browser
    if (window["WebSocket"]) {

        // create connection with url of node server
        wsGame.socket = new WebSocket("ws://127.0.0.1:8000");

        // on open event
        wsGame.socket.onopen = function(e) {
            console.log("WebSocket connection established.");
        };

        // on close event
        wsGame.socket.onclose = function(e) {
            console.log("WebSocket connection closed.");
        };

        // add handler - print out messages received from server
        // on message event - listen to the server message
        wsGame.socket.onmessage = function(e) {
            // convert the JSON-formatted string back to the data object

            // check if the received data is chat or line segment
            console.log("onmessage event:", e.data);
            var data = JSON.parse(e.data); //  parse to JavaScript object

            // check if the message is chat
            if (data.dataType === wsGame.CHAT_MESSAGE) {
                $("#chat-history").append("<li>" + data.sender + " said: "+ data.message + "</li>");
            }
            // check if the message is line segment
            else if (data.dataType === wsGame.LINE_SEGMENT) {
                drawLine(ctx, data.startX, data.startY, data.endX, data.endY, 1);
            }
            // game logic message contains different kind of state
            else if (data.gameState === wsGame.GAME_START) {
                if (data.gameState === wsGame.GAME_OVER) {
                    wsGame.isTurnToDraw = false;
                    
                    $("#chat-history").append("<li>" + data.winner + " guessed the word!\n The word was: " + data.theWord + "!</li>");
                    
                    $("#restart").show();
                }
                
            }
        };
    }
});


// -----------------------------------------------------------------------
// send messages to the server when click 'Send' button
$("#send").click(sendMessage);

$("#chat-input").keypress(function(event) {
    if (event.keyCode === 13) { 
        sendMessage();
    } 
});

function sendMessage() {
    console.log("clicked");

    var message = $("#chat-input").val();

    // pack the message into an object
    var data = {};
    data.dataType = wsGame.CHAT_MESSAGE;
    data.message = message;

    // format to JSON and send to server
    wsGame.socket.send(JSON.stringify(data));
    $("#chat-input").val("");
    
}
