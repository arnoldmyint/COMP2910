/**
 *	control_frame
 *	@context 
 *
 *	Drawing of buttons around game.	
 *	
 */
function control_frame(context) {
    frame = document.getElementById("control_panel");
    eraser = document.getElementById("eraser");
    roll = document.getElementById("roll");
    clear = document.getElementById("clear");
    pause = document.getElementById("pause");
    box = document.getElementById("box");
    slope3 = document.getElementById("slope_SE");
    slope1 = document.getElementById("slope_NW");
    slope0 = document.getElementById("slope_SW");
    slope2 = document.getElementById("slope_NE");
    direction0 = document.getElementById("direction_SW");
    direction1 = document.getElementById("direction_NW");
    direction2 = document.getElementById("direction_NE");
    direction3 = document.getElementById("direction_SE");
    context.drawImage(frame, 8, 850, 789, 160);
    context.drawImage(eraser, 7, 630, 400, 210);
    context.drawImage(roll, 395, 630, 400, 210);
    context.drawImage(clear, 395, 20, 400, 210);
    context.drawImage(pause, 7, 20, 400, 210);
    context.drawImage(box, 135, 900);
//    context.clearRect(272,890,105,95);
//    context.fillStyle = "#D6FFCD";
//    context.fillRect(272,890,114,98);
    if(slope == 1){
        context.drawImage(slope1, 290, 890);
    }else if(slope == 2){
        context.drawImage(slope2, 290, 890);
    }else if(slope == 3){
        context.drawImage(slope3, 290, 890);
    }else if(slope == 0){
        context.drawImage(slope0, 290, 890);
    }
//    context.clearRect(421,890,105,95);
//    context.fillStyle = "#D6FFCD";
//    context.fillRect(421,890,114,98);
    if(direction == 4){
        context.drawImage(direction0, 435, 890);
    }else if(direction == 1){
        context.drawImage(direction1, 435, 890);
    }else if(direction == 2){
        context.drawImage(direction2, 435, 890);
    }else if(direction == 3){
        context.drawImage(direction3, 435, 890);
    }else if(direction == 0){
        context.drawImage(direction0, 435, 890);
    }
    if(levels != 0){
        number();   
    }
//    canvas.onclick = function (e){
//        var point = getPointOnCanvas(canvas,e.pageX, e.pageY);
//        console.log(point.x);
//        console.log(point.y);
//    }
}

function number(){
    context.fillStyle = "black";
    context.font = "30px Georgia";
    context.fillText(numberOfBoxes, 169,890);
    context.fillText(numberOfSlopes, 330, 890);
    context.fillText(numberOfDirections, 477, 890);
}

function removeShapes(clear){
    if(numberOfBoxes <= 0){
        context.clearRect(120, 870, 105, 118);
        context.fillStyle = "#D6FFCD";
        context.fillRect(120, 870,114,118);
    }
    if(numberOfDirections <= 0){
        context.clearRect(421,870,105,118);
        context.fillStyle = "#D6FFCD";
        context.fillRect(421,870,105,118);
    }
    if(numberOfSlopes <= 0){
        context.clearRect(272,870,105,118);
        context.fillStyle = "#D6FFCD";
        context.fillRect(272,870,105,118);
    }
    if(levels != 0){
        number();   
    }
    if(clear){
        context.clearRect(120, 870, 105, 118);
        context.clearRect(421,870,105,118);
        context.clearRect(272,870,105,118);
        context.fillStyle = "#D6FFCD";
        context.fillRect(120, 870,114,118);
        context.fillRect(421,870,105,118);
        context.fillRect(272,870,105,118);
        control_frame(context);
    }
}