/**
 * GameFrame.js
 * 
 * Object creation, isometric grid and redraw handled.
 * 
 */
 
 function chooseLevel(whichLevel){
	 if(whichLevel == 1){
		end = 25;
		start = 13;
	 } else if(whichLevel == 2){
		 end = 20;
		 start = 20;
	 } else if(whichLevel == -1){
         var i = parseInt(36 * Math.random());
     }
 }
 
 /**
  * createObj
  *	No params
  *	Populates array for floor and walls with each tile. 6x6
  */
function createObj() {
    var rows=0;
    var cols=0;
    for(var i=0; i<36; i++){
        var rect_floor={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], start:false
        };
        if(i%6==0){
            rows++;
            cols=0;
        }
        rect_floor.x=cols*rect_floor.width;
        rect_floor.y=rows*rect_floor.height;
        rect_floor.index=i;
        array_floor.push(rect_floor);
        cols++;
    }

    rows=0;
    cols=0;
    for(var j=0; j<36; j++){
        var rect_right={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], end:false
        };
        if(j%6==0){
            rows++;
            cols=0;
        }
        rect_right.x=cols*rect_right.width;
        rect_right.y=rows*rect_right.height;
        rect_right.index=j;
        array_right.push(rect_right);
        cols++;
    }

    rows=0;
    cols=0;
    for(var k=0; k<36; k++){
        var rectObj={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
        };
        if(k%6==0){
            rows++;
            cols=0;
        }
        rectObj.x=cols*rectObj.width;
        rectObj.y=rows*rectObj.height;
        rectObj.index=k;
        array_left.push(rectObj);
        cols++;
    }
}

/**
 *	floor
 *	@context 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function floor(context){
	endPoint=document.getElementById("end");
    for(var i=0; i<array_floor.length; i++){
		if(i == end){
			getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
			var pos = shapePoints(i,0);
			array_floor[i].end = true;
		} else {
			context.beginPath();
			context.fillStyle="#65A658";
			context.setTransform(1,0.5,-1,0.5,455,395);
			context.strokeStyle="D6FFCD";
			context.strokeRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
			context.fillRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
			array_floor[i].type="floor";
			getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
		}
    }
	context.setTransform(1,0,0,1,0,0);
	context.drawImage(endPoint, pos.x, pos.y,109,109);
	/*
    if(randomize(array_floor,context)%29 == 0){
        c=0;
        for(var j=0; j<36; j++){
            array_floor[j].color = "#D6FFCD";
        }
    }
	*/
    context.restore();
}

/**
 *	right_wall
 *	@context 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function right_wall(context){
	startPoint=document.getElementById("start");
    for(var i=0; i<array_right.length; i++){
		if(i == start){
			getPoints(array_right[i],1,0.5,0,1,400,38);
			var pos = getStart();
			var getPos = shapePoints(pos.theIndex,pos.theLayer);
			array_right[i].start = true;
		} else {
			egg = array_right[i];
			context.beginPath();
			context.fillStyle="#6DBB6C";
			context.strokeStyle="#D6FFCD";
			context.setTransform(1,0.5,0,1,400,38);
			context.strokeRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
			context.fillRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
			array_right[i].type="right_wall";
			getPoints(array_right[i],1,0.5,0,1,400,38);
		}
    }
	context.setTransform(1,0,0,1,0,0);
	context.drawImage(startPoint, getPos.x, getPos.y,110,110);
	/*
    if(randomize(array_right,context)%29 == 0){
        c=0;
        for(var j=0; j<36; j++){
            array_right[j].color = "#D6FFCD";
        }
    }
	*/
    context.restore();
}

/**
 *	left_wall
 *	@context 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function left_wall(context){
    for(var i=0; i<array_left.length; i++){
        context.beginPath();
        context.fillStyle="#4E7F44";
        context.strokeStyle="#D6FFCD";
        context.setTransform(1,-0.5,0,1,70,203);
        context.strokeRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        context.fillRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        array_left[i].type="left_wall";
        getPoints(array_left[i],1,-0.5,0,1,70,203);
    }
    context.restore();
//    context.save();
//    if(!moving && !mouseUp){
//        $(canvas).on("click touchstart", function (e) {
//            easter(e,context);
//        });
//    }
}

/**
 *	frame_horizontal
 *	@context 
 *
 *	
 *	
 *	
 */
function frame_horizontal(context) {
    context.beginPath();
    context.strokeStyle="#D6FFCD";
    var grd_left = context.createLinearGradient(20, 20, 20, 55);
    grd_left.addColorStop(0, "#65A564");
    grd_left.addColorStop(0.5, "#DDF9C0");
    grd_left.addColorStop(1, "#D6FFCD");
    //bottom_left
    context.fillStyle=grd_left;
    context.setTransform(1,0.5,0,2,15,560);
    for(var i=0; i<7; i++) {
        context.strokeRect(i*55,0,55,55);
        context.fillRect(i*55,0,55,55);
    }
    var grd_right = context.createLinearGradient(20, 20, 20, 55);
    grd_right.addColorStop(0, "#50824F");
    grd_right.addColorStop(0.5, "#DDF9C0");
    grd_right.addColorStop(1, "#D6FFCD");
    //bottom_right
    context.fillStyle=grd_right;
    context.setTransform(1,-0.5,0,2,400,753);
    for(var j=0; j<7; j++) {
        context.strokeRect(j*55,0,55,55);
        context.fillRect(j*55,0,55,55);
    }

    context.fillStyle="#84E383";
    //top_right
    context.setTransform(1,0.5,-1,0.5,400,38);
    for(var k=0; k<7; k++) {
        context.strokeRect(k*55,0,55,55);
        context.fillRect(k*55,0,55,55);
    }
    //top_left
    context.setTransform(1,-0.5,1,0.5,15,230);
    for(var n=0; n<6; n++) {
        context.strokeRect(n*55,0,55,55);
        context.fillRect(n*55,0,55,55);
    }
    context.restore();
}

/**
 *	frame_vertical
 *	@context 
 *
 *	
 *	
 *	
 */
function frame_vertical(context) {
    context.beginPath();
    context.fillStyle="#50824F";
    context.strokeStyle="#D6FFCD";
    //right
    context.setTransform(1,-0.5,0,1,730,258);
    for(var i=0; i<6; i++) {
        context.strokeRect(0,i*55,55,55);
        context.fillRect(0,i*55,55,55);
    }
    context.fillStyle="#65A564";
    //left
    context.setTransform(1,0.5,0,1,15,230);
    for(var j=0; j<6; j++) {
        context.strokeRect(0,j*55,55,55);
        context.fillRect(0,j*55,55,55);
    }
    context.restore();
}

/**
 *	timer
 *	@context 
 *
 *	Timer for game play, loss cases and calculating score.
 *	
 */
function timer(context){
    clearInterval(mytimer);
    mytimer = setInterval(function (){
        context.clearRect(0, 0, 800, 10);
        document.getElementById('time').innerHTML=time-- +" seconds";
        var bar=time * 4;
        //console.log(time);
        if(time >= 150){
            context.fillStyle="green";
        } else if(time >= 100){
            context.fillStyle="blue";
        } else if(time >= 50){
            context.fillStyle="yellow";
        } else{
            context.fillStyle="red";
        }
        
        context.fillRect(0,0,bar - 10,10);
            
       if(time == 0){
            clearInterval(timer);
            $("#mycanvas").hide();
            $("#time").hide();
            $("#gameOver").show();
        }
    }, 1000);
    control(context);
    //return false;
}

/**
 *	redraw
 *	@context 
 *
 *	redraws the entire canvas
 *	
 */
function redraw(context) {
    context.save();
    floor(context);
    context.save();
    right_wall(context);
    context.save();
    left_wall(context);
    context.save();
    frame_horizontal(context);
    context.save();
    frame_vertical(context);
    context.save();
}

/**
 *	easter
 *	@e click point x, y
 *	@context 
 *
 *	Checks to see if the left_wall bottom right point has been clicked,
 *	if so, changes the brain to an easter egg.
 *	
 */
function easter(e,context) {
    e.preventDefault();
    context.setTransform(1,0.5,0,1,400,38);
    //var i = parseInt(36 * Math.random());
    var i = 35;
    if(device.mobile() || device.tablet()){
        var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
    }else{
        var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
    }
    if (point.x >= array_left[i].points[3].x && point.x <= array_left[i].points[1].x && point.y >= array_left[i].points[0].y && point.y <= array_left[i].points[2].y && !mouseUp && !moving){
        context.fillStyle="black";
        context.fillRect(egg.x,egg.y,egg.width,egg.height);
        $(canvas).unbind("click touchstart", easter);
    }
}

/**
 *	addAllShapes
 *	@context 
 *	@position Contains all shapes that have been placed on the grid.
 *
 *	Draws all shapes that have been placed on the grid.
 *	
 */
function addAllShapes(context,position){
    context.setTransform(1, 0, 0, 1, 0, 0);
	
	for(i = 0; i < position.length;i++){
		for(var j = 0; j < position[i].length;j++){
			if(position[i][j].used == true){
				if(position[i][j].type == "box"){
					context.drawImage(box, position[i][j].point.x, position[i][j].point.y-2,109,112);
				} else if (position[i][j].type == "slope_SW"){
					context.drawImage(slope0, position[i][j].point.x, position[i][j].point.y-2,109,112);
				} else if (position[i][j].type == "slope_NW"){
					context.drawImage(slope1, position[i][j].point.x, position[i][j].point.y-2,109,112);
				} else if (position[i][j].type == "slope_NE"){
					context.drawImage(slope2, position[i][j].point.x, position[i][j].point.y-2,109,112);
				} else if (position[i][j].type == "slope_SE"){
					context.drawImage(slope3, position[i][j].point.x, position[i][j].point.y-2,109,112);
				}else if (position[i][j].type == "direction_SW"){
                    context.drawImage(direction0, position[i][j].point.x, position[i][j].point.y-2,109,112);
                }else if (position[i][j].type == "direction_NW"){
                    context.drawImage(direction1, position[i][j].point.x, position[i][j].point.y-2,109,112);
                }else if (position[i][j].type == "direction_NE"){
                    context.drawImage(direction2, position[i][j].point.x, position[i][j].point.y-2,109,112);
                }else if (position[i][j].type == "direction_SE"){
                    context.drawImage(direction3, position[i][j].point.x, position[i][j].point.y-2,109,112);
                }
			}
		}
	}
//    console.log(position[0][0].point.x);
//    console.log(position[0][0].point.y);
}

/**
 *	addTransparentShape
 *	@context 
 *	@x position to draw shape
 *	@y position to draw shape
 *	@type shape type
 *
 *	Draws the transparent shape at correct location for being dragged.	
 *	
 */
function addTransparentShape(context,x,y,type){
	if(type == "box"){
		context.drawImage(trn_box, x, y,109,109);
	} else if (type == "slope_SW"){
		context.drawImage(trn_slope_SW, x, y,109,109);
	} else if (type == "slope_NW"){
		context.drawImage(trn_slope_NW, x, y,109,109);
	} else if (type == "slope_SE"){
		context.drawImage(trn_slope_SE, x, y,109,109);
	} else if (type == "slope_NE"){
		context.drawImage(trn_slope_NE, x, y,109,109);
	}
}

/**
 *	orientationchange
 *		
 *	Checks if device has been rotates, only supports landscape mode.
 *	
 */
$(window).bind('orientationchange', function() {
    switch ( window.orientation ) {
        case 0:
            $('.turnDeviceNotification').css('display', 'none');
            // The device is in portrait mode now
            if(device.tablet() && !device.landscape()){
                alert("Please rotate your tablet to landscape to continue!");
            }
            break;

        case 180:
            $('.turnDeviceNotification').css('display', 'none');
            // The device is in portrait mode now
            if(device.tablet() && !device.landscape()){
                alert("Please rotate your phone to landscape to continue!");
            }
            break;

        case 90:
            // The device is in landscape now
            $('.turnDeviceNotification').css('display', 'block');
            if(device.landscape() && !device.tablet()){
                alert("Please rotate your phone back to portrait mode to continue!");
            }
            break;

        case -90:
            // The device is in landscape now
            $('.turnDeviceNotification').css('display', 'block');
            if(device.landscape() && !device.tablet()){
                alert("Please rotate your phone back to portrait mode to continue!");
            }
            break;
    }
});
