/**
 * Control.js
 *
 *	Control all events.
 *
 */
 
 /**
 *	control_frame
 *	@context 
 *
 *	Drawing of buttons around game.	
 *	
 */
function control_frame(context) {
	//var rollx = [405,787,785];
	//var rolly = [832,638,832];
    frame = document.getElementById("control_panel");
    eraser = document.getElementById("eraser");
    roll = document.getElementById("roll");
    clear = document.getElementById("clear");
    pause = document.getElementById("pause");
    box = document.getElementById("box");
    slope_NE = document.getElementById("slope_NE");
    slope_NW = document.getElementById("slope_NW");
    slope_SW = document.getElementById("slope_SW");
    slope_SE = document.getElementById("slope_SE");
    context.drawImage(frame, 8, 850, 789, 295);
    context.drawImage(eraser, 7, 630, 400, 210);
    context.drawImage(roll, 395, 630, 400, 210);
    context.drawImage(clear, 395, 20, 400, 210);
    context.drawImage(pause, 7, 20, 400, 210);
    context.drawImage(box, 135, 900);
    context.drawImage(slope_SW, 290, 890);
    context.drawImage(slope_NW, 435, 890);
    context.drawImage(slope_SE, 585, 900);
    context.drawImage(slope_NE, 135, 1030);
	
	//FOR TESTING OF X AND Y LOCATION
	canvas.onclick=function (e){
		var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
		console.log(point.x);
		console.log(point.y);
	}
	
}

/**
 *	control
 *	@context
 *	@myTimer tracks time during game.
 *
 *	All events
 *	
 */
function control(context,mytimer) {
    var positions = [];
    var position = -1;
	var posLayer = 0;
	var shapeType = null;
	
	//initialize layers
	for(var i = 0; i < 6; i++){
		positions[i] = [];
	}
	
	for(i = 0; i < 6; i++){
		for(var j = 0; j < 36; j++){
			var shapeObject = {
				index:0,type:null,point:{x:0,y:0}, used:false, direction:null
			};
			shapeObject.index = j;
			shapeObject.point = shapePoints(j,i)
			
			
			positions[i].push(shapeObject);
		}
	}
	            
    control_frame(context);

	/**
	 *	move
	 *	@e point of cursor
	 *
	 *	Dragging of shape across the grid, draws transparently.
	 *	
	 */
    function move(e) {
		posLayer = 0;
        moving = true;
        context.clearRect(0, 10, canvas.width, canvas.height);
        if (device.mobile() || device.tablet()) {
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
        } else {
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
        }
        redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
        for (var i = 0; i < array_floor.length; i++) {
            var Xvertices = [array_floor[i].points[0].x, array_floor[i].points[1].x, array_floor[i].points[2].x, array_floor[i].points[3].x];
            var Yvertices = [array_floor[i].points[0].y, array_floor[i].points[1].y, array_floor[i].points[2].y, array_floor[i].points[3].y];
            if (polygonClicked(Xvertices.length, Xvertices, Yvertices, point.x, point.y)){
                position = i;
				for (var j = 0; j < positions.length; j++) {
					for(var k = 0; k < positions[j].length; k++){
						if (positions[j][k].used == true && positions[j][k].index == position) {
							posLayer = j + 1;
							break;
						}
					}
				}
				//checks to ensure shape is only drawn on floor or ontop of boxes and not higher than the grid.
				if(posLayer != 0 && positions[posLayer-1][position].type != "box" || posLayer > 6  || position == end){
					break;
				}
				addTransparentShape(context,positions[posLayer][position].point.x,positions[posLayer][position].point.y,shapeType);
                break;
            } else {
                position = -1;
            }
        }
    }

	/**
	 *	up
	 *	
	 *	mouse released, adding to array of shapes.
	 *	
	 */
    function up() {
        moving = false;
        mouseUp = true;
		
		//checks to ensure shape is only drawn on floor or ontop of boxes and not higher than the grid.
		if(posLayer != 0 && positions[posLayer-1][position].type != "box" || posLayer > 6 || position == end){
			posLayer = 0;
			return;
		}
        if(position != -1){
            positions[posLayer][position].type = shapeType;
			positions[posLayer][position].used = true;
            position = -1;
            posLayer = 0;
        }
        context.clearRect(0, 10, canvas.width, canvas.height);
        redraw(context);
        context.save();
        addAllShapes(context, positions);
        control_frame(context);
        if (device.mobile()) {
            $(canvas).unbind('touchmove', move);
            $(canvas).unbind('touchend', up);
        } else if (device.desktop()) {
            $(canvas).unbind("mousemove", move);
            $(canvas).unbind("mouseup", up);
            //$(canvas).unbind("mousedown", down);
        } else if (device.tablet()) {
            $(canvas).unbind('touchmove', move);
            $(canvas).unbind('touchend', up);
        }
    }
	
	/**
	 *	rollBrain
	 *
	 *	Initiates brain rolling
	 *	
	 */
	function rollBrain(){
        clearInterval(mytimer);
		brain(context, positions);
		
		$(canvas).unbind("click", rollBrain);
	}
	
	/**
	 *	eraseAll
	 *
	 *	erases all of the blocks on the canvas and redraws.
	 *
	 */
	function eraseAll(){
		for(i = 0; i < positions.length; i++){
			for(j = 0; j < positions[i].length; j++){
				positions[i][j].used = false;
			}
		}
		
		redraw(context);
		control_frame(context);
		$(canvas).unbind("click", eraseAll);
	}

    /**
	 *	paused
	 *
	 *	Pause the game.
	 *
	 */
	function paused(){
        clearInterval(mytimer);
        $("#time").hide();
        $("#mycanvas").hide();        
        $("#pauseGame").toggle();
	}
	
    
	/*
	 *	controls for desktop
	 */
    if (device.desktop()) {
        
        $(canvas).on("click mousedown", function (e) {
            moving = false;
            mouseUp = false;
            var clicking = false;
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
            var x = point.x;
            var y = point.y;
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                shapeType = "box";
                $(canvas).on("mousemove", move);
                $(canvas).on("mouseup", up);
            } else if(x>283 && y>904 && x<371 && y<981){
//                $(canvas).on("mousemove", move);
//                $(canvas).on("mouseup", up);
                 if(e.type == "click"){
                     clicking = true;
                     shapeType = "slope_NW";
                     context.clearRect(272,890,114,108);
                     context.drawImage(slope_NW, 290, 890);
                     return;
                 } else if(e.type == "mousedown" && !clicking){
                     //console.log(3);
                     clicking = false;
                     shapeType = "slope_SW";
                     $(canvas).on("mousemove", move);
                     $(canvas).on("mouseup", up);
                 }
//                 setTimeout(function () {
//                     if(!clicking && e.type == "mousedown"){
//                         clicking = false;
//                         shapeType = "slope_SW";
//                         $(canvas).on("mousemove", move);
//                         $(canvas).on("mouseup", up);
//                     }
//                 }, 500);
//                 shapeType = "slope_SW";
//                 $(canvas).on("mousemove", move);
//                 $(canvas).on("mouseup", up);
            } else if(x > 418 && x < 536 && y < 1000 && y > 890){
				shapeType = "slope_NW";
                $(canvas).on("mousemove", move);
                $(canvas).on("mouseup", up);
                $(canvas).unbind("mousedown", this);				
			} else if(x > 566 && x < 686 && y < 1000 && y > 890){
				shapeType = "slope_SE";
                $(canvas).on("mousemove", move);
                $(canvas).on("mouseup", up);
                $(canvas).unbind("mousedown", this);				
			} else if(x > 118 && x < 236 && y < 1128 && y > 1016){
				shapeType = "slope_NE";
                $(canvas).on("mousemove", move);
                $(canvas).on("mouseup", up);
                $(canvas).unbind("mousedown", this);				
			} else if(polygonClicked(3, rollx = [405,787,785], rolly = [832,638,832], x, y) == true){
				$(canvas).on("click", rollBrain);
			} else if(polygonClicked(3, rollx = [13,387,15], rolly = [634,826,826], x, y) == true){
				$(canvas).on("click", eraseAll);
			} else if(polygonClicked(3, rollx = [405,787,789], rolly = [25,24,225], x, y) == true){
				$(canvas).on("click", eraseAll);
			}  else if(polygonClicked(3, rollx = [13,395,13], rolly = [24,24,220], x, y) == true){
				paused();
			}
            //if(e.type == "click"){
            //alert(x + ", " + y );
            //}
            // if(e.type == "click"){
            //     //clicking = true;
            //     console.log(x,y);
            // }
        });
    }

	/*
	 * Controls for mobile
	 */
    if (device.mobile()) {
        $(canvas).on("touchstart", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
            var x = point.x;
            var y = point.y;
            //alert(x);
            //alert(y);
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                shapeType = "box";
                $(canvas).on('touchmove', move);
                $(canvas).on('touchend', up);
            }
        });
    }
    if (device.tablet()) {
        $(canvas).on("touchstart", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
            var x = point.x;
            var y = point.y;
            if (x > 0 && y > 0 && x < 87 && y < 87) {
                shapeType = "box";
                $(canvas).on('touchmove', move);
                $(canvas).on('touchend', up);
            }
        });
    }
}

/**
 *	randomize
 *	@arr array of tiles for floor or walls
 *	@context
 *
 *	Randomizing a start and end point.
 *
 */
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
