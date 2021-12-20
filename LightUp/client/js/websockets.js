//#region VARIABLE
// response to the server

// drawing logic
var wsGame = {
    // constants to compare datatypes
    LINE_SEGMENT : 0,
    CHAT_MESSAGE : 1,
    GAME_LOGIC : 2, // handle the game logic, contains different data for different game states
    GAME_CLEAR : 4,
    GAME_UNDO : 5,
    MOUSE_UP : 6,
    
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
// var backupCanvas = document.createElement("canvas");
// var draw_color = "black"; // default color
canvas.width = window.innerWidth - 60;
canvas.height = 400;

//#endregion

// ------------------------------------------------------------------------------------------------------------------------
// init script when the DOM is ready.
$(function(){
    // check if existence of WebSockets in browser
    if (window["WebSocket"]) {

        //#region SETUP CONNECTION

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

        //#endregion

        //#region ACTION FOR CLIENT

        // add handler - print out messages received from server
        // on message event - listen to the server message
        wsGame.socket.onmessage = function(e) {
            // convert the JSON-formatted string back to the data object

            // check if the received data is chat or line segment
            // console.log("onmessage event:", e.data);
            var data = JSON.parse(e.data); //  parse to JavaScript object

            //#region CHECK DATA_TYPE instead of GAME_LOGIC

            // check if the message is chat
            if (data.dataType === wsGame.CHAT_MESSAGE) {
                $("#chat-history").append("<li>" + data.sender + " said: "+ data.message + "</li>");
            }
            // check if the message is line segment
            else if (data.dataType === wsGame.LINE_SEGMENT) {
                // drawLine(ctx, data.startX, data.startY, data.endX, data.endY, 1);
                draw(ctx, data.startX, data.startY, data.endX, data.endY, data.draw_color, data.draw_width);
                
                if (data.gameState === wsGame.MOUSE_UP) {
                    stop();
                    // event.preventDefault();

                    // stop drawing -> add the path inside array when mouse out
                    // if (event.type != "mouseout") {
                        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
                        index += 1;
                    // }
                    
                    console.log(restore_array);   
                }
                
                if (data.gameState === wsGame.GAME_UNDO) {
                    undo_last();
                    console.log(restore_array);
                    data.gameState = wsGame.WAITING_TO_START;
                }
                
            }
            //#endregion
            
            //#region SET UP GAME_LOGIC
            else if (data.dataType === wsGame.GAME_LOGIC) {

                // finish a game
                if (data.gameState === wsGame.GAME_OVER) {
                    wsGame.isTurnToDraw = false;
                    $("#chat-history").append("<li>" + data.winner + " wins! The answer is '"+ data.answer + "'.</li>");
                    $("#restart").show();
                }

                // start a new game
                if (data.gameState === wsGame.GAME_START) {
                    // clear the Canvas.
                    // canvas.width = canvas.width;
                    clear_canvas();

                    // hide the restart button.
                    $("#restart").hide();
                    
                    // clear the chat history
                    $("#chat-history").html("");
 
                    if (data.isPlayerTurn) {
                        wsGame.isTurnToDraw = true;
                        if (wsGame.isTurnToDraw = true) {
                            $("#chat-input").hide();
                            $("#send").hide();

                            $("#undo-btn").show();
                            $("#clear-btn").show();
                            $("#eraser-btn").show();

                            $("#cWhite").show();
                            $("#cWhite").show();
                            $("#cBlack").show();
                            $("#cRed").show();
                            $("#cBlue").show();
                            $("#cGreen").show();
                            $("#cYellow").show();

                            $("#cPicker").show();
                            $("#penRange").show();
                            
                        }                     
                        $("#chat-history").append("<li>Your turn to draw. Please draw '" + data.answer + "'.</li>");
                    }
                    else {
                        $("#chat-history").append("<li>Game Started. Get Ready. You have one minute to guess.</li>");
                        $("#chat-input").show();
                        $("#send").show();

                        $("#undo-btn").hide();
                        $("#clear-btn").hide();
                        $("#eraser-btn").hide();

                        $("#cWhite").hide();
                        $("#cWhite").hide();
                        $("#cBlack").hide();
                        $("#cRed").hide();
                        $("#cBlue").hide();
                        $("#cGreen").hide();
                        $("#cYellow").hide();

                        $("#cPicker").hide();
                        $("#penRange").hide();

                    }
                }

                // when press CLEAR button
                if (data.gameState === wsGame.GAME_CLEAR) {
                    clear_canvas();
                    data.gameState = wsGame.WAITING_TO_START;
                }
            }
            //#endregion
        };
        //#endregion
    }
});

//#region MESSAGE + CONTROL GAME
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

// restart button
$("#restart").hide();
$("#restart").click(function(){
    
    // canvas.width = canvas.width;
    clear_canvas();
    $("#chat-history").html("");
    $("#chat-history").append("<li>Restarting Game.</li>");

    // pack the restart message into an object.
    var data = {};
    data.dataType = wsGame.GAME_LOGIC;
    data.gameState = wsGame.GAME_RESTART;
    wsGame.socket.send(JSON.stringify(data));

    $("#restart").hide();
});

//#endregion