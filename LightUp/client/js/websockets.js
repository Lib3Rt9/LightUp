// drawing logic
var websocketGame = {
    
    // indicates if it is drawing now.
    isDrawing : false,
    
    // the starting point of next line drawing.
    startX : 0,
    startY : 0,
}

// canvas context
var canvas = document.getElementById('drawing-pad');
var ctx = canvas.getContext('2d');

// -----------------------------------------------------------------------
// init script when the DOM is ready.
$(function(){
    // check if existence of WebSockets in browser
    if (window["WebSocket"]) {

        // create connection
        websocketGame.socket = new WebSocket("ws://127.0.0.1:8000");

        // on open event
        websocketGame.socket.onopen = function(e) {
            console.log("WebSocket connection established.");
        };

        // on close event
        websocketGame.socket.onclose = function(e) {
            console.log("WebSocket connection closed.");
        };

        // add handler - print out messages received from server
        // on message event - listen to the server message
        websocketGame.socket.onmessage = function(e) {
            $("#chat-history").append("<li>"+e.data+"</li>");
            // console.log(e.data);
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
    websocketGame.socket.send(message);
    $("#chat-input").val("");
}
