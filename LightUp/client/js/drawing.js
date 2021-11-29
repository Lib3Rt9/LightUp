$(document).ready(function(){
    
    // the logic of drawing in the Canvas
    $("#drawing-pad").mousedown(function(e) {
        
        // get the mouse x and y relative to the canvas top-left point.
        var mouseX = e.originalEvent.layerX || e.offsetX || 0;
        var mouseY = e.originalEvent.layerY || e.offsetY || 0;
        
        websocketGame.startX = mouseX;
        websocketGame.startY = mouseY;
        websocketGame.isDrawing = true;
   
    });

   $("#drawing-pad").mousemove(function(e) {
    
        // draw lines when is drawing
        if (websocketGame.isDrawing) {
            
            // get the mouse x and y 
            // relative to the canvas top-left point.
            var mouseX = e.originalEvent.layerX || e.offsetX || 0;
            var mouseY = e.originalEvent.layerY || e.offsetY || 0;
            
            if (!(mouseX === websocketGame.startX && mouseY === websocketGame.startY)) {
                drawLine(ctx, websocketGame.startX, 
                websocketGame.startY,mouseX,mouseY,1);
                websocketGame.startX = mouseX;
                websocketGame.startY = mouseY;
            }
        }
    });

    $("#drawing-pad").mouseup(function(e) {
        websocketGame.isDrawing = false;
    });
   
});

function drawLine(ctx, x1, y1, x2, y2, thickness) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#444";
    ctx.stroke();
}