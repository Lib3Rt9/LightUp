// take canvas field
var canvas = document.getElementById("drawing-pad");
// style the canvas drawing pad
canvas.width = window.innerWidth - 60;
canvas.height = 400;

// ctx - 2d ctx
var ctx = canvas.getContext("2d");

// coloring the drawing pad
let start_background_color = "white";
ctx.fillStyle = start_background_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// variables for drawing work
let draw_color = "black"; // default color
let draw_width = "2"; // default pen width
// let wsGame.isDrawing = false;

// array for the drawing lines
let restore_array = [];
let index = -1; // to know the place in the array

function change_color(element) {
    draw_color = element.style.background;
}


// drawing function when pressing the mouse button - prepare and draw
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);



// getting the mouse coordinates 
function start(event) {

    wsGame.isDrawing = true;

    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    ctx.beginPath(); // begin new canvas path
    ctx.moveTo(mouseX, mouseY);

    // let default changes disappear
    event.preventDefault();

    wsGame.startX = mouseX;
    wsGame.startY = mouseY;

}


// let's start drawing
// var mouseX = e.clientX - canvas.offsetLeft;
// var mouseY = e.clientY - canvas.offsetTop;
function draw(event) {
    
    if (wsGame.isDrawing == true) {

        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;

        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    
        
        var data = {};
        data.dataType = wsGame.LINE_SEGMENT;
        data.startX = wsGame.startX;
        data.startY = wsGame.startY;
        data.endX = mouseX;
        data.endY = mouseY;
        wsGame.socket.send(JSON.stringify(data));

        wsGame.startX = mouseX;
        wsGame.startY = mouseY;

    }
    event.preventDefault();
}

// stop drawing when mouse is out or being released
function stop(event) {
    if (wsGame.isDrawing) {
        ctx.stroke();
        ctx.closePath();
        wsGame.isDrawing = false;
    }
    // let default changes disappear
    event.preventDefault();

    // stop drawing -> add the path inside array when mouse out
    if (event.type != "mouseout") {
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
    
    console.log(restore_array);
}

// clear all the drawing
function clear_canvas(event) {
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

function redo_last() {
    
}
