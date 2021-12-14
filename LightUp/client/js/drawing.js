// references from many sources
$(document).ready(function(){
    // the logic of drawing in the Canvas
    
    // when start clicking the mouse
    $("#drawing-pad").mousedown(function(e) {
        
        if (!wsGame.isTurnToDraw) {
            wsGame.isDrawing = false;
            return;
        }
        // get the mouse x and y relative to the canvas top-left point.
        var mouseX = e.originalEvent.layerX || e.offsetX || 0;
        var mouseY = e.originalEvent.layerY || e.offsetY || 0;
        
        wsGame.startX = mouseX;
        wsGame.startY = mouseY;
        wsGame.isDrawing = true;
   
    });

    // when drawing with the mouse
    $("#drawing-pad").mousemove(function(e) {
        if (!wsGame.isTurnToDraw) {
            return;
        }
        // draw and send to server

        // draw lines when is drawing
        if (wsGame.isDrawing) {
            
            // get the mouse x and y 
            // relative to the canvas top-left point.
            var mouseX = e.originalEvent.layerX || e.offsetX || 0;
            var mouseY = e.originalEvent.layerY || e.offsetY || 0;
            
            if (!(mouseX === wsGame.startX && mouseY === wsGame.startY)) {
                drawLine(ctx, wsGame.startX, wsGame.startY, mouseX, mouseY, 1);
                
                // send the line segment to server
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
        }
    });

    // when release the mouse
    $("#drawing-pad").mouseup(function(e) {
        wsGame.isDrawing = false;
    });
   
});

// draw the lines, given starting and ending points
function drawLine(ctx, x1, y1, x2, y2, thickness) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#500";
    ctx.stroke();
}