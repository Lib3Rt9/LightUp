//#region variable

// take canvas field
// var canvas = document.getElementById("drawing-pad");
// style the canvas drawing pad
// canvas.width = window.innerWidth - 60;
// canvas.height = 400;

// ctx - 2d ctx
var ctx = canvas.getContext("2d");

// coloring the drawing pad
var start_background_color = "white";
ctx.fillStyle = start_background_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// variables for drawing work
let draw_color = "black"; // default color
var draw_width = "2"; // default pen width
var round = "round";
// let wsGame.isDrawing = false;

// array for the drawing lines
var restore_array = [];
var index = -1; // to know the place in the array

var snapshot;

//#endregion

function change_color(element) { draw_color = element.style.background; }

//#region action old

// drawing function when pressing the mouse button - prepare and draw
// canvas.addEventListener("touchstart", start, false);
// canvas.addEventListener("touchmove", draw, false);
// canvas.addEventListener("mousedown", start, false);
// canvas.addEventListener("mousemove", draw, false);

// canvas.addEventListener("touchend", stop, false);
// canvas.addEventListener("mouseup", stop, false);
// canvas.addEventListener("mouseout", stop, false);

//#endregion

$(document).ready(function(){ // main action
    
    $(canvas).mousedown(function(event) { mousedown_touchstart(event); });
    // $(canvas).touchstart(function(event) { mouse_touch_move(event) });

    $(canvas).mousemove(function(event) { mouse_touch_move(event); });
    // $(canvas).touchmove(function(event) { mouse_touch_move(event) });

    $(canvas).mouseup(function(event) { mouse_up_out_touchend(event); });
    // $(canvas).mouseout(function(event) { mouse_up_out_touchend(event); });

    $("#clear-btn").click(function() { clear_button(); });

    $("#undo-btn").click(function() { undo_button(); })
});

//#region DRAW ACTION

// getting the mouse coordinates 
function start(event) { // merged with draw() - keep as reference

    wsGame.isDrawing = true;

    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    ctx.beginPath(); // begin new canvas path
    ctx.moveTo(mouseX, mouseY);

    // let default changes disappear
    event.preventDefault();

    // wsGame.startX = mouseX;
    // wsGame.startY = mouseY;

}

// let's start drawing
function draw(ctx, x1, y1, x2, y2, draw_color, draw_width) {
    
    // if (wsGame.isDrawing == true) {

        // var mouseX = event.clientX - canvas.offsetLeft;
        // var mouseY = event.clientY - canvas.offsetTop;

        // ctx.getImageData(0, 0, canvas.width, canvas.height);
        takeSnapshot();
        ctx.beginPath(); // begin new canvas path
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    
        console.log(snapshot);
        

    // }
    // event.preventDefault();
}

// stop drawing when mouse is out or being released
function stop(event) {
    if (wsGame.isDrawing) {
        ctx.stroke();
        ctx.closePath();
        wsGame.isDrawing = false;
    }

    // let default changes disappear
    // event.preventDefault();

    // // stop drawing -> add the path inside array when mouse out
    // if (event.type != "mouseout") {
    //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    //     index += 1;
    // }
    
    // console.log(restore_array);
}

//#endregion

//#region SUPPORTER FUNCTIONS - clear, un-redo

// clear all the drawing
function clear_canvas() {
    ctx.fillStyle = start_background_color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // restore the area again
    restore_array = [];
    index = -1;
}

// undo a drawing line
function undo_last() {

    if (index <= 0) { // nothing inside array
        clear_canvas();
    }
    // in case there is something inside
    else {
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }
}

// redo a drawing line
function redo_last() {
    
}

//#endregion

//#region CONTROL ACTION and SEND to SERVER
function mousedown_touchstart(event) {
    if (!wsGame.isTurnToDraw) {
        wsGame.isDrawing = false;
        return;
    }

    // start(event);
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    wsGame.startX = mouseX;
    wsGame.startY = mouseY;
    wsGame.isDrawing = true;
}

function mouse_touch_move(event) {
    if (!wsGame.isTurnToDraw) {
        return;
    }

    if (wsGame.isDrawing) {
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;

        if (!(mouseX === wsGame.startX && mouseY === wsGame.startY)) {
        // draw(event);
            draw(ctx, wsGame.startX, wsGame.startY, mouseX, mouseY, draw_color, draw_width);

            var data = {};
            data.dataType = wsGame.LINE_SEGMENT;
            data.startX = wsGame.startX;
            data.startY = wsGame.startY;
            data.endX = mouseX;
            data.endY = mouseY;
            data.draw_color = draw_color;
            data.draw_width = draw_width;
            
            wsGame.socket.send(JSON.stringify(data));

            // console.log(data);

            wsGame.startX = mouseX;
            wsGame.startY = mouseY;
        }
    }
    event.preventDefault();
}

function mouse_up_out_touchend(event) {
    stop(event);
        event.preventDefault();

        // stop drawing -> add the path inside array when mouse out
        // if (event.type != "mouseout") {
        //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        //     index += 1;
        // }
        
        // console.log(restore_array);

        var data = {};
        data.dataType = wsGame.LINE_SEGMENT;
        data.gameState = wsGame.MOUSE_UP;
        wsGame.socket.send(JSON.stringify(data));
}

function clear_button() {
    clear_canvas();
    
    var data = {};
    data.dataType = wsGame.GAME_LOGIC;
    data.gameState = wsGame.GAME_CLEAR;
    wsGame.socket.send(JSON.stringify(data));
}

function undo_button() {
    // undo_last();
    
    var data = {};
    data.dataType = wsGame.LINE_SEGMENT;
    data.gameState = wsGame.GAME_UNDO;
    wsGame.socket.send(JSON.stringify(data));

    console.log(restore_array);
}
//#endregion


function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}