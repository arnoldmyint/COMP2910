/**
 * Control.js
 *
 *	Control all events.
 *
 */
 
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
				index:0,type:null,point:{x:0,y:0}, used:false, direction:null,shapeName:null,undo:-1
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
    //var canvasimg = new Image();
    function move(e) {
        e.preventDefault();
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
        if(levels != 0){
            removeShapes(false);   
        }
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
                //canvasimg.src = canvas.toDataURL();
                //context.drawImage(canvasimg, 0, 0, 1600, 3200);
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
    function up(e) {
        e.preventDefault();
        moving = false;
        mouseUp = true;
		//checks to ensure shape is only drawn on floor or ontop of boxes and not higher than the grid.
		if(posLayer != 0 && positions[posLayer-1][position].type != "box" || posLayer > 6 || position == end){
			posLayer = 0;
			return;
		}
        if(position != -1 && positions[posLayer][position].used != true){
			numShapes++;
            positions[posLayer][position].type = shapeType;
			positions[posLayer][position].used = true;
			positions[posLayer][position].undo = numShapes;
            if(levels != 0){
                if(shapeType == "box"){
                    numberOfBoxes--;
                //checkShapes(positions, shapeType);
                } else if(shapeType == "slope_SW" || shapeType == "slope_SE" || shapeType == "slope_NE" || shapeType == "slope_NW"){
                    numberOfSlopes--;
                //checkShapes(positions, "slope");
                } else if(shapeType == "direction_SW" || shapeType == "direction_SE" || shapeType == "direction_NE" || shapeType == "direction_NW"){
                    numberOfDirections--;
                //checkShapes(positions, "direction");
                }   
            }
            position = -1;
            posLayer = 0;
        }
        context.clearRect(0, 10, canvas.width, canvas.height);
        redraw(context);
        //context.save();
        addAllShapes(context, positions);
        control_frame(context);
        if(levels != 0){
            removeShapes(false);
        }
        if (device.mobile() || device.tablet()) {
            $(canvas).unbind('touchmove', move);
            $(canvas).unbind('touchend', up);
        } else if (device.desktop()) {
            $(canvas).unbind("mousemove", move);
            $(canvas).unbind("mouseup", up);
            //$(canvas).unbind("mousedown", down);
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
		
		$(canvas).unbind("click touchstart touchend", rollBrain);
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
        if(levels != 0){
            numberOfBoxes = boxNo;
            numberOfSlopes = slopeNo;
            numberOfDirections = directionNo;
            removeShapes(true);   
        }
		$(canvas).unbind("click touchstart touchend", eraseAll);
	}
    
    function undo(){
		var undoIndex;
		var undoLayer;
		var lastPlaced = 0;
		for(var i = 0; i < positions.length; i++){
			for(var j = 0; j < positions[i].length; j++){
				if(positions[i][j].used == true && positions[i][j].undo > lastPlaced){
					lastPlaced = positions[i][j].undo;
					undoIndex = j;
					undoLayer = i;
				}
			}
		}
		
		if(lastPlaced == 0){
			return;
		}
		
		if(levels != 0){
			if(positions[undoLayer][undoIndex].type == "box"){
				numberOfBoxes++;
			} else if(positions[undoLayer][undoIndex].type == "slope_SW" || positions[undoLayer][undoIndex].type == "slope_SE" || positions[undoLayer][undoIndex].type == "slope_NE" || positions[undoLayer][undoIndex].type == "slope_NW"){
				numberOfSlopes++;
			} else if(positions[undoLayer][undoIndex].type == "direction_SW" || positions[undoLayer][undoIndex].type == "direction_SE" || positions[undoLayer][undoIndex].type == "direction_NE" || positions[undoLayer][undoIndex].type == "direction_NW"){
				numberOfDirections++;
			}   
		}
		
		positions[undoLayer][undoIndex].type = null;
		positions[undoLayer][undoIndex].used = false;
		positions[undoLayer][undoIndex].shapeName = null;
		positions[undoLayer][undoIndex].undo = -1;
		positions[undoLayer][undoIndex].direction = null;		
		
		redraw(context);
		control_frame(context);
        addAllShapes(context, positions);
		
        if(levels != 0){
            removeShapes();   
        }
		numShapes--;
		
		$(canvas).unbind("click touchstart touchend", undo);
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
        $("#pauseGame").slideToggle();
	}
    
    
	/*
	 *	controls for desktop
	 */
    if (device.desktop()) {   
        var slopeTypes = "slope_SW";
        //context.drawImage(slope0, 290, 890);
        slope = 0;
        var directionTypes = "direction_SW";
        //context.drawImage(direction0, 435, 890);
        direction = 0;
        var clicking = false;
        $(canvas).on("click mousedown", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
            var x = point.x;
            var y = point.y;
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                if(levels != 0 && numberOfBoxes <= 0){
                    return;
                }
                if(e.type == "click"){
                    clicking = true;
                    return false;
                }else if(e.type == "mousedown" && !clicking){
                    shapeType = "box";
                    clicking = false;
                    $(canvas).on("mousemove", move);
                    $(canvas).on("mouseup", up);      
                }
                clicking = false;
            } else if(x>283 && y>904 && x<371 && y<981){
                if(levels != 0 && numberOfSlopes <= 0){
                    return;
                }
                 if(e.type == "click"){
                     clicking = true;
                     slope++;
                     context.clearRect(272,890,105,95);
                     context.fillStyle = "#D6FFCD";
                     context.fillRect(272,890,105,95);
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
                    if(e.type == "mousedown" && !clicking){
                        shapeType = slopeTypes;
                        clicking = false;
                        $(canvas).on("mousemove", move);
                        $(canvas).on("mouseup", up);  
                    }
                }, 500);
                clicking = false;
            } else if(x > 418 && x < 536 && y < 1000 && y > 890){
                if(levels != 0 && numberOfDirections <= 0){
                    return;
                }
                if(e.type == "click"){
                     clicking = true;
                     direction++;
                     context.clearRect(421,890,105,95);
                     context.fillStyle = "#D6FFCD";
                     context.fillRect(421,890,105,95);
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
                        //console.log(shapeType);
                        clicking = false;
                        $(canvas).on("mousemove", move);
                        $(canvas).on("mouseup", up);
                    }
                }, 500);
                clicking = false;			
			} else if(polygonClicked(3, rollx = [405,787,785], rolly = [832,638,832], x, y) == true){
				$(canvas).on("click", rollBrain);
			} else if(polygonClicked(3, rollx = [13,387,15], rolly = [634,826,826], x, y) == true){
				$(canvas).on("click", undo);
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
    if (device.mobile() || device.tablet()) {
        var slopeTypes = "slope_SW";
        context.drawImage(slope0, 290, 890);
        slope = 0;
        var directionTypes = "direction_SW";
        context.drawImage(direction0, 435, 890);
        direction = 0;
        var tapping = false;
        $(canvas).on("touchstart touchend", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas, e.originalEvent.changedTouches[0].pageX, e.originalEvent.changedTouches[0].pageY);
            var x = point.x;
            var y = point.y;
            if (x > 136 && y > 900 && x < 223 && y < 987) {
                if(levels != 0 && numberOfBoxes <= 0){
                    return;
                }
                if(e.type == "touchend"){
                    tapping = true;
                    return false;
                }
                 var timeOut = setTimeout(function (){
                    if(e.type == "touchstart" && !tapping){
                        shapeType = "box";
                        tapping = false;
                        $(canvas).on("touchmove", move);
                        $(canvas).on("touchend", up);  
                    }
                }, 500);
                tapping = false;
            }else if(x>283 && y>904 && x<371 && y<981){
                if(levels != 0 && numberOfSlopes <= 0){
                    return;
                }
                 if(e.type == "touchend"){
                     tapping = true;
                     slope++;
                     context.clearRect(272,890,105,95);
                     context.fillStyle = "#D6FFCD";
                     context.fillRect(272,890,105,95);
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
                     return false;
                }
                var timeOut = setTimeout(function (){
                    if(e.type == "touchstart" && !tapping){
                        shapeType = slopeTypes;
                        tapping = false;
                        $(canvas).on("touchmove", move);
                        $(canvas).on("touchend", up);  
                    }
                }, 500);
                tapping = false;
            }else if(x > 418 && x < 536 && y < 1000 && y > 890){
                if(levels != 0 && numberOfDirections <= 0){
                    return;
                }
                if(e.type == "touchend"){
                     tapping = true;
                     direction++;
                     context.clearRect(421,890,105,95);
                     context.fillStyle = "#D6FFCD";
                     context.fillRect(421,890,105,95);
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
                    if(e.type == "touchstart" && !tapping){
                        shapeType = directionTypes;
                        //console.log(shapeType);
                        tapping = false;
                        $(canvas).on("touchmove", move);
                        $(canvas).on("touchend", up);
                    }
                }, 500);
                tapping = false;			
			} else if(polygonClicked(3, rollx = [405,787,785], rolly = [832,638,832], x, y) == true){
				$(canvas).on("touchstart touchend", rollBrain);
			} else if(polygonClicked(3, rollx = [13,387,15], rolly = [634,826,826], x, y) == true){
				$(canvas).on("touchstart touchend", undo);
                //console.log(1);
			} else if(polygonClicked(3, rollx = [405,787,789], rolly = [25,24,225], x, y) == true){
				$(canvas).on("touchstart touchend", eraseAll);
			}  else if(polygonClicked(3, rollx = [13,395,13], rolly = [24,24,220], x, y) == true){
				paused();
			}
        });
    }
}

function retry(){
    clearInterval(mytimer);
    time = 200;
    removeAllEvent();
    if(levels == 0){
        isRetry = true;
        load(0);
    } else {
        load(levels);
    }
    $("#gameOver").hide();
    $("#mycanvas").show();
    $("#time").show();
}