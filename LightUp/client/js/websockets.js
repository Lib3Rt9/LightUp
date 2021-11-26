var websocketGame = {
}

// init script when the DOM is ready.
$(function(){
    // check if existence of WebSockets in browser
    if (window["WebSocket"]) {
 
        // create connection
        websocketGame.socket = new WebSocket("ws://127.0.0.1:8000");
 
        // on open event
        websocketGame.socket.onopen = function(e) {
            console.log('WebSocket connection established.');
        };
 
        // on close event
        websocketGame.socket.onclose = function(e) {
            console.log('WebSocket connection closed.');
        }; 
    }
});