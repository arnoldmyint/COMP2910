/**
 * Created by siyuanwang on 2016-05-17.
 */
function control(context) {
    context.save();
    var positions = [];
    var position = -1;
	var posLayer = 0;
	var shapeType = null;
	
	for(var i = 0; i < 6; i++){
		positions[i] = [];
	}
    
    frame = document.getElementById("control_panel");
    eraser = document.getElementById("eraser");
    roll = document.getElementById("roll");
    box = document.getElementById("box");
    slope_NE = document.getElementById("slope_NE");
    slope_NW = document.getElementById("slope_NW");
    slope_SW = document.getElementById("slope_SW");
    slope_SE = document.getElementById("slope_SE");
    if (device.mobile()) {
        draw_phone(context);
    } else if (device.desktop() || device.tablet()) {
        draw_desktop(context);
    }
    function draw_phone(context) {
        context.drawImage(frame, 8, 850, 789, 295);
        context.drawImage(eraser, 7, 630, 400, 210);
        context.drawImage(roll, 395, 630, 400, 210);
        context.drawImage(box, 136, 900);
    }

    function draw_desktop(context) {
        context.drawImage(frame, 8, 850, 789, 295);
        context.drawImage(eraser, 7, 630, 400, 210);
        context.drawImage(roll, 395, 630, 400, 210);
        context.drawImage(box, 0, 0);
    }

    function move(e) {
		posLayer = 0;
        e.preventDefault();
        moving = true;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (device.mobile() || device.tablet()) {
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
        } else {
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
        }
        redraw(context);
        if (device.mobile()) {
            draw_phone(context);
        } else if (device.desktop() || device.tablet()) {
            draw_desktop(context);
        }
        addBox(context, positions);
        for (var i = 0; i < array_floor.length; i++) {
            if (point.x >= array_floor[i].points[3].x - 80 && point.x <= array_floor[i].points[1].x - 80 && point.y >= array_floor[i].points[0].y - 90 && point.y <= array_floor[i].points[2].y - 90) {
                position = 0;
                context.setTransform(1, 0.5, -1, 0.5, 455, 395);
                context.fillStyle = "black";
                context.fillRect(array_floor[i].x, array_floor[i].y, array_floor[i].width, array_floor[i].height);
                context.restore();
                position = i;
                break;
            } else {
                position = -1;
            }
        }
	    // Check if position is already in the array
        for (i = 0; i < positions.length; i++) {
			for(var j = 0; j < positions[i].length; j++){
				if (positions[i][j].index == position) {
					posLayer = i+1;
					break;
				}
			}
        }
        context.drawImage(box, point.x, point.y);
    }

    function up(e) {
        e.preventDefault();
        moving = false;
        mouseUp = true;
        context.clearRect(0, 0, canvas.width, canvas.height);
        redraw(context);
		
		if(position != -1){
			var shapeObject = {
				index:0,type:null
			};
			shapeObject.index = position;
			shapeObject.type = shapeType;
			positions[posLayer].push(shapeObject);
		}
		
        addBox(context, positions);
        if (device.mobile()) {
            draw_phone(context);
            $(canvas).unbind('touchmove', move);
            $(canvas).unbind('touchend', up);
        } else if (device.desktop()) {
            draw_desktop(context);
            canvas.removeEventListener("mousemove", move, false);
            canvas.removeEventListener("mouseup", up, false);
        } else if (device.tablet()) {
            draw_desktop(context);
            $(canvas).unbind('touchmove', move);
            $(canvas).unbind('touchend', up);
        }
    }

    if (device.desktop()) {
        canvas.addEventListener("mousedown", function down (e) {
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
            var x = point.x;
            var y = point.y;
            if (x > 0 && y > 0 && x < 87 && y < 87) {
				shapeType = "box";
                canvas.addEventListener("mousemove", move, false);
                canvas.addEventListener("mouseup", up, false);
            }
        }, false);
        canvas.removeEventListener("mousedown", down, false);
    }
    
    if (device.mobile()) {
        $(canvas).on("touchstart", function down (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
            var x = point.x;
            var y = point.y;
            //alert(x);
            //alert(y);
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                $(canvas).on('touchmove', move);
                $(canvas).on('touchend', up);
            }
        });
        $(canvas).unbind("touchstart", down);
    }
    if (device.tablet()) {
        $(canvas).on("touchstart", function down (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
            var x = point.x;
            var y = point.y;
            if (x > 0 && y > 0 && x < 87 && y < 87) {
                $(canvas).on('touchmove', move);
                $(canvas).on('touchend', up);
            }
        });
        $(canvas).unbind("touchstart", down);
    }
}

function randomize(arr,context) {
    do {
        var i = parseInt(36 * Math.random());
        //add constraint of the holes and balls
        if (arr[i].index < 6 || (arr[i].index > 29 && arr[i].type == "right_wall")) {
            arr[i].color = "red";
        }
    } while (arr[i].color == "red");
    arr[i].color = "red";
    context.fillStyle = arr[i].color;
    context.fillRect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
    if(arr[i].type == "right_wall"){
        egg = arr[i];
    }
    return c++;
}
