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

var snapshot, dragging = false, dragStartLocation, mouseX, mouseY, radius;
var coordinates = [], indexPolygon = 0;

//#endregion

// ===================================================================================
// ===================================================================================
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

// ===================================================================================
// ===================================================================================
$(document).ready(function(){ // MAIN FUNCTION
    
    $(canvas).mousedown(function(event) { mousedown_touchstart(event); });
    // $(canvas).touchstart(function(event) { mouse_touch_move(event) });

    $(canvas).mousemove(function(event) { mouse_touch_move(event); });
    // $(canvas).touchmove(function(event) { mouse_touch_move(event) });

    $(canvas).mouseup(function(event) { mouse_up_out_touchend(event); });
    // $(canvas).mouseout(function(event) { mouse_up_out_touchend(event); });
    // $(canvas).touchend(function(event) { mouse_up_out_touchend(event); });

    $("#clear-btn").click(function() { clear_button(); });

    $("#undo-btn").click(function() { undo_button(); })
});

// ===================================================================================
// ===================================================================================
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

    dragStart(event);
}

function mouse_touch_move(event) {
    if (!wsGame.isTurnToDraw) {
        return;
    }

    var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
        polygonSides = document.getElementById("polygonSides").value,
        polygonAngle = document.getElementById("polygonAngle").value;

    var calPolAngle = polygonAngle * (Math.PI / 180);

    if (wsGame.isDrawing) {
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;

        position = getCanvasCoordinates(event);

        // restoreSnapshot();
        if (shape === "normal")
        {
            if (!(mouseX === wsGame.startX && mouseY === wsGame.startY))
            {
                // restoreSnapshot();
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

                // console.log(index);

                wsGame.startX = mouseX;
                wsGame.startY = mouseY;
            }
        }
        if (shape === "line")
        {
            restoreSnapshot();
            drawLine(ctx, dragStartLocation, position, draw_color, draw_width);
            
            // var data = {};
            // data.dataType = wsGame.DRAW_LINE;
            // data.dragStartLocation = dragStartLocation;
            // data.position = position;
            // data.draw_color = draw_color;
            // data.draw_width = draw_width;

            // wsGame.socket.send(JSON.stringify(data));
        }
        if (shape === "circle")
        {
            restoreSnapshot();
            drawCircle(ctx, dragStartLocation, position, radius, draw_color, draw_width);

            // var data = {};
            // data.dataType = wsGame.DRAW_CIRCLE;
            // data.dragStartLocation = dragStartLocation;
            // data.position = position;
            // data.radius = radius;
            // data.draw_color = draw_color;
            // data.draw_width = draw_width;

            // wsGame.socket.send(JSON.stringify(data));
            // // console.log(data.position);
        }
        if (shape === "polygon")
        {
            restoreSnapshot();
            drawPolygon(ctx, dragStartLocation, position, coordinates, radius, indexPolygon, polygonSides, calPolAngle, draw_color, draw_width);

            // var data = {};
            // data.dataType = wsGame.DRAW_POLYGON;
            // data.dragStartLocation = dragStartLocation;
            // data.position = position;
            // data.coordinates = coordinates;
            // data.radius = radius;
            // data.indexPolygon = indexPolygon;
            // data.polygonSides = polygonSides;
            // data.calPolAngle = calPolAngle;
            // data.draw_color = draw_color;
            // data.draw_width = draw_width;

            // wsGame.socket.send(JSON.stringify(data));
            // // console.log(calPolAngle);
            // // console.log(data.calPolAngle);
        }
        // else
        // {
        //     ctx.stroke();
        // }

        ctx.stroke();
    }
    event.preventDefault();
}

function mouse_up_out_touchend(event) {

    var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;

    // if (shape === "normal") {
        
    if (shape === "line") {
        var data = {};
        data.dataType = wsGame.DRAW_LINE;
        data.dragStartLocation = dragStartLocation;
        data.position = position;
        data.draw_color = draw_color;
        data.draw_width = draw_width;

        wsGame.socket.send(JSON.stringify(data));
        console.log(draw_width);
        console.log(data.draw_width);

        // stop();
        // event.preventDefault();

        // // stop drawing -> add the path inside array when mouse out
        // // if (event.type != "mouseout") {
        // //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        // //     index += 1;
        // // }
        
        // // console.log(restore_array);

        // var data = {};
        // data.dataType = wsGame.DRAW_LINE;
        // data.gameState = wsGame.MOUSE_UP;
        // wsGame.socket.send(JSON.stringify(data));
    }
    if (shape === "circle") {
        var data = {};
        data.dataType = wsGame.DRAW_CIRCLE;
        data.dragStartLocation = dragStartLocation;
        data.position = position;
        data.radius = radius;
        data.draw_color = draw_color;
        data.draw_width = draw_width;

        wsGame.socket.send(JSON.stringify(data));
        // console.log(data.position);

        // stop();
        // event.preventDefault();

        // // stop drawing -> add the path inside array when mouse out
        // // if (event.type != "mouseout") {
        // //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        // //     index += 1;
        // // }
        
        // // console.log(restore_array);

        // var data = {};
        // data.dataType = wsGame.DRAW_CIRCLE;
        // data.gameState = wsGame.MOUSE_UP;
        // wsGame.socket.send(JSON.stringify(data));
    }
    if (shape === "polygon") {
        var data = {};
        data.dataType = wsGame.DRAW_POLYGON;
        data.dragStartLocation = dragStartLocation;
        data.position = position;
        data.coordinates = coordinates;
        data.radius = radius;
        data.indexPolygon = indexPolygon;
        data.polygonSides = polygonSides;
        data.calPolAngle = calPolAngle;
        data.draw_color = draw_color;
        data.draw_width = draw_width;

        wsGame.socket.send(JSON.stringify(data));
        // console.log(calPolAngle);
        // console.log(data.calPolAngle);
        // stop();
        // event.preventDefault();

        // // stop drawing -> add the path inside array when mouse out
        // // if (event.type != "mouseout") {
        // //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        // //     index += 1;
        // // }
        
        // // console.log(restore_array);

        // var data = {};
        // data.dataType = wsGame.DRAW_POLYGON;
        // data.gameState = wsGame.MOUSE_UP;
        // wsGame.socket.send(JSON.stringify(data));
    }
    stop();
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
//#endregion

// ===================================================================================
// ===================================================================================
//#region BASIC DRAW ACTION

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

        ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // begin new canvas path
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
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

// ===================================================================================
// ===================================================================================
//#region SUPPORTER FUNCTIONS - clear, un-redo, straight line, circle, polygon

function getCanvasCoordinates(event) {
    var mouseX = event.clientX - canvas.offsetLeft,
        mouseY = event.clientY - canvas.offsetTop;

    return {mouseX: mouseX, mouseY: mouseY};
}

// draw STRAIGHT LINE
function drawLine(ctx, dragStartLocation, position, draw_color, draw_width) {
    // takeSnapshot();
    ctx.beginPath();
    ctx.moveTo(dragStartLocation.mouseX, dragStartLocation.mouseY);
    ctx.lineTo(position.mouseX, position.mouseY);
    ctx.stroke();
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

// draw CIRCLE
function drawCircle(ctx, dragStartLocation, position, radius, draw_color, draw_width) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.mouseX - position.mouseX), 2) + Math.pow((dragStartLocation.mouseY - position.mouseY), 2));
    ctx.beginPath();
    ctx.arc(dragStartLocation.mouseX, dragStartLocation.mouseY, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

// draw POLYGON
function drawPolygon(ctx, dragStartLocation, position, coordinates, radius, indexPolygon, sides, angle, draw_color, draw_width) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.mouseX - position.mouseX), 2) + Math.pow((dragStartLocation.mouseY - position.mouseY), 2)),
        indexPolygon = 0;

    for (indexPolygon = 0; indexPolygon < sides; indexPolygon++) {
        coordinates.push({mouseX: dragStartLocation.mouseX + radius * Math.cos(angle), mouseY: dragStartLocation.mouseY - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    ctx.beginPath();
    ctx.moveTo(coordinates[0].mouseX, coordinates[0].mouseY);
    for (indexPolygon = 1; indexPolygon < sides; indexPolygon++) {
        ctx.lineTo(coordinates[indexPolygon].mouseX, coordinates[indexPolygon].mouseY);
    }

    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.closePath();
}

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
    window.alert("This feature is being updated...");
}

//#endregion

// ===================================================================================
// ===================================================================================
//#region BONUS FEATURES
function change_color(element) { draw_color = element.style.background; }

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


// used for DRAWING the SHAPE
// which contains LINE, CIRCLE, POLYGON

// drag
function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawShape(position, "polygon");
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawShape(position, "polygon");
}

function takeSnapshot() { snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); }

function restoreSnapshot() { ctx.putImageData(snapshot, 0, 0); }
//#endregion