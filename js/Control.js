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
    context.clearRect(272,890,114,98);
    context.fillStyle = "#D6FFCD";
    context.fillRect(272,890,114,98);
    if(slope == 4){
        context.drawImage(slope0, 290, 890);
    }else if(slope == 1){
        context.drawImage(slope1, 290, 890);
    }else if(slope == 2){
        context.drawImage(slope2, 290, 890);
    }else if(slope == 3){
        context.drawImage(slope3, 290, 890);
    }else if(slope == 0){
        context.drawImage(slope0, 290, 890);
    }
    context.clearRect(421,890,114,98);
    context.fillStyle = "#D6FFCD";
    context.fillRect(421,890,114,98);
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
//    context.drawImage(slope3, 585, 900);
//    context.drawImage(slope2, 135, 1030);
	//console.log(slopeTypes);
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
function control(context) {
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
			shapeObject.point = shapePoints(j,i);
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
        if(position != -1 && positions[posLayer][position].used != true){
            positions[posLayer][position].type = shapeType;
            console.log(shapeType);
			positions[posLayer][position].used = true;
            position = -1;
            posLayer = 0;
        }
        context.clearRect(0, 10, canvas.width, canvas.height);
        redraw(context);
        //context.save();
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
    
    function erase(){
        
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
        var slopeTypes = "slope_SW";
        var directionTypes = "direction_SW";
        var clicking = false;
        $(canvas).on("click mousedown touchstart", function (e) {
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
            var x = point.x;
            var y = point.y;
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                if(e.type == "click" || e.type == "touchstart"){
                    clicking = true;
                    return false;
                }else if((e.type == "mousedown" || e.type == "touchstart") && !clicking){
                    shapeType = "box";
                    clicking = false;
                    if(device.desktop()){
                        $(canvas).on("mousemove", move);
                        $(canvas).on("mouseup", up);      
                    }else if(device.mobile() || device.tablet()){
                        $(canvas).on("touchmove", move);
                        $(canvas).on("touchend", up);   
                    }
                }
                clicking = false;
            } else if(x>283 && y>904 && x<371 && y<981){
                 if(e.type == "click" || e.type == "touchstart"){
                     clicking = true;
                     slope++;
                     context.clearRect(272,890,114,98);
                     if(slope == 4){
                         slopeTypes = "slope_SW";
                         slope = 0;
                         context.drawImage(slope0, 290, 890);
                     }else if(slope == 1){
                         slopeTypes = "slope_NW";
                         context.drawImage(slope1, 290, 890);
                     }else if(slope == 2){
                         slopeTypes = "slope_NE";
                         context.drawImage(slope2, 290, 890);
                     }else if(slope == 3){
                         slopeTypes = "slope_SE";
                         context.drawImage(slope3, 290, 890);
                     }
//                     console.log(slope);
//                     console.log(types);
                     return false;
                }
                var timeOut = setTimeout(function (){
//                         console.log("down "+slope);
//                         console.log("down "+types);
                    //console.log(clicking);
                    if((e.type == "mousedown" || e.type == "touchstart") && !clicking){
                        shapeType = slopeTypes;
                        clicking = false;
                        if(device.desktop()){
                            $(canvas).on("mousemove", move);
                            $(canvas).on("mouseup", up);      
                        }else if(device.mobile() || device.tablet()){
                            $(canvas).on("touchmove", move);
                            $(canvas).on("touchend", up);   
                        }
                    }
                }, 500);
                clicking = false;
            } else if(x > 418 && x < 536 && y < 1000 && y > 890){
                if(e.type == "click"){
                     clicking = true;
                     direction++;
                     context.clearRect(421,890,114,98);
                     if(direction == 4){
                         directionTypes = "direction_SW";
                         direction = 0;
                         context.drawImage(direction0, 435, 890);
                     }else if(direction == 1){
                         directionTypes = "direction_NW";
                         context.drawImage(direction1, 435, 890);
                     }else if(direction == 2){
                         directionTypes = "direction_NE";
                         context.drawImage(direction2, 435, 890);
                     }else if(direction == 3){
                         directionTypes = "direction_SE";
                         context.drawImage(direction3, 435, 890);
                     }
                     return false;
                }
                var timeOut = setTimeout(function (){
                    if(e.type == "mousedown" && !clicking){
                        shapeType = directionTypes;
                        console.log(shapeType);
                        clicking = false;
                        $(canvas).on("mousemove", move);
                        $(canvas).on("mouseup", up);
                    }
                }, 500);
                clicking = false;
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
                //console.log(1);
			} else if(polygonClicked(3, rollx = [405,787,789], rolly = [25,24,225], x, y) == true){
				$(canvas).on("click", eraseAll);
			}  else if(polygonClicked(3, rollx = [13,395,13], rolly = [24,24,220], x, y) == true){
				paused();
			}
        });
    }

	/*
	 * Controls for mobile
	 */
//    if (device.mobile() || device.tablet()) {
//        $(canvas).on("touchstart", function (e) {
//            e.preventDefault();
//            moving = false;
//            mouseUp = false;
//            var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
//            var x = point.x;
//            var y = point.y;
//            //alert(x);
//            //alert(y);
//            if (x > 136 && y > 900 && x < 223 && y < 987) {
//                shapeType = "box";
//                $(canvas).on('touchmove', move);
//                $(canvas).on('touchend', up);
//            }
//        });
//    }
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