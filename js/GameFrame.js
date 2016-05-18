/**
 * Created by siyuanwang on 2016-05-17.
 */
function createObj() {
    var rows=0;
    var cols=0;
    for(var i=0; i<36; i++){
        var rect_floor={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
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
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
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

function floor(context){
    for(var i=0; i<array_floor.length; i++){
        context.beginPath();
        context.fillStyle="#48DACD";
        context.setTransform(1,0.5,-1,0.5,455,395);
        context.strokeStyle="black";
        context.strokeRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
        context.fillRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
        array_floor[i].type="floor";
        getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
    }
    if(randomize(array_floor,context)%29 == 0){
        c=0;
        for(var j=0; j<36; j++){
            array_floor[j].color = "#48DACD";
        }
    }
    context.restore();
}
function right_wall(context){
    for(var i=0; i<array_right.length; i++){
        context.beginPath();
        context.fillStyle="#00B2A3";
        context.strokeStyle="#faebd7";
        context.setTransform(1,0.5,0,1,400,38);
        context.strokeRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
        context.fillRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
        array_right[i].type="right_wall";
        getPoints(array_right[i],1,0.5,0,1,400,38);
    }
    if(randomize(array_right,context)%29 == 0){
        c=0;
        for(var j=0; j<36; j++){
            array_right[j].color = "#00B2A3";
        }
    }
    context.restore();
}

function left_wall(context){
    for(var i=0; i<array_left.length; i++){
        context.beginPath();
        context.fillStyle="#007A6F";
        context.strokeStyle="#faebd7";
        context.setTransform(1,-0.5,0,1,70,203);
        context.strokeRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        context.fillRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        array_left[i].type="left_wall";
        getPoints(array_left[i],1,-0.5,0,1,70,203);
    }
    context.restore();
    context.save();
    if(device.desktop() && !moving){
        canvas.onclick=function (e) {
            easter(e,context);
        }
    }
}
/*
 generate the random cells for holes and balls
 */

function frame_horizontal(context) {
    context.beginPath();
    context.strokeStyle="#faebd7";
    var grd_left = context.createLinearGradient(20, 20, 20, 55);
    grd_left.addColorStop(0, "#00B2A3");
    grd_left.addColorStop(0.5, "#DDF9C0");
    grd_left.addColorStop(1, "#faebd7");
    //bottom_left
    context.fillStyle=grd_left;
    context.setTransform(1,0.5,0,2,15,560);
    for(var i=0; i<7; i++) {
        context.strokeRect(i*55,0,55,55);
        context.fillRect(i*55,0,55,55);
    }
    var grd_right = context.createLinearGradient(20, 20, 20, 55);
    grd_right.addColorStop(0, "#007A6F");
    grd_right.addColorStop(0.5, "#DDF9C0");
    grd_right.addColorStop(1, "#faebd7");
    //bottom_right
    context.fillStyle=grd_right;
    context.setTransform(1,-0.5,0,2,400,753);
    for(var j=0; j<7; j++) {
        context.strokeRect(j*55,0,55,55);
        context.fillRect(j*55,0,55,55);
    }

    context.fillStyle="#48DACD";
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

function frame_vertical(context) {
    context.beginPath();
    context.fillStyle="#007A6F";
    //right
    context.setTransform(1,-0.5,0,1,730,258);
    for(var i=0; i<6; i++) {
        context.strokeRect(0,i*55,55,55);
        context.fillRect(0,i*55,55,55);
    }
    context.fillStyle="#00B2A3";
    //left
    context.setTransform(1,0.5,0,1,15,230);
    for(var j=0; j<6; j++) {
        context.strokeRect(0,j*55,55,55);
        context.fillRect(0,j*55,55,55);
    }
    context.restore();
}
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

function easter(e,context) {
    context.setTransform(1,0.5,0,1,400,38);
    //var i = parseInt(36 * Math.random());
    var i = 35;
    var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
    if (point.x >= array_left[i].points[3].x && point.x <= array_left[i].points[1].x && point.y >= array_left[i].points[0].y && point.y <= array_left[i].points[2].y && !mouseUp){
        context.fillStyle="black";
        context.fillRect(egg.x,egg.y,egg.width,egg.height);
    }
    context.restore();
}

function addBox(context,position){
    box_image = new Image();
    box_image.src = 'images/Block.png';
    context.setTransform(1, 0, 0, 1, 0, 0);

    position.sort(function(a, b){return a-b});

    var theX;
    var theY;
    var thePosition;
    var thePos;

    for(var i=0; i<position.length; i++){
        thePosition = array_floor[position[i]].index;
        thePos = thePosition;
        thePos = thePos%6;

        if(thePosition < 6){
            theX = 345 + (thePos*array_floor[position[i]].width);
            theY = 367 + (thePos*(array_floor[position[i]].height*0.5));
        } else if(thePosition < 12 && thePosition > 5){
            theX = (345 - (array_floor[position[i]].width)) + (thePos*array_floor[position[i]].width);
            theY = (367 + (array_floor[position[i]].height*0.5)) + (thePos*(array_floor[position[i]].height * 0.5));
        } else if(thePosition < 18 && thePosition > 11){
            theX = (345 - (array_floor[position[i]].width*2)) + (thePos*array_floor[position[i]].width);
            theY = (367 + (array_floor[position[i]].height*1)) + (thePos*(array_floor[position[i]].height * 0.5));
        } else if(thePosition < 24 && thePosition > 17){
            theX = (345 - (array_floor[position[i]].width*3)) + (thePos*array_floor[position[i]].width);
            theY = (367 + (array_floor[position[i]].height*1.5)) + (thePos*(array_floor[position[i]].height * 0.5));
        } else if(thePosition < 30 && thePosition > 23){
            theX = (345 - (array_floor[position[i]].width*4)) + (thePos*array_floor[position[i]].width);
            theY = (367 + (array_floor[position[i]].height*2)) + (thePos*(array_floor[position[i]].height * 0.5));
        } else if (thePosition < 36 && thePosition > 29){
            theX = (345 - (array_floor[position[i]].width*5)) + (thePos*array_floor[position[i]].width);
            theY = (367 + (array_floor[position[i]].height*2.5)) + (thePos*(array_floor[position[i]].height * 0.5));
        }
        context.drawImage(box_image, theX, theY,109,109);
    }
}

function getPointOnCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: (x - bbox.left) * (canvas.width  / bbox.width),
        y: (y - bbox.top)  * (canvas.height / bbox.height)
    };
}

function getPoints(rectObj,a,b,c,d,e,f){
    var x = rectObj.x;
    var y = rectObj.y;

    rectObj.points[0].x = (a * x) + (c * y) + e;
    rectObj.points[0].y = b * x + d * y + f;

    x += 55;
    rectObj.points[1].x = a * x + c * y + e;
    rectObj.points[1].y = b * x + d * y + f;
    y += 55;
    rectObj.points[2].x = a * x + c * y + e;
    rectObj.points[2].y = b * x + d * y + f;

    x -= 55;
    rectObj.points[3].x = a * x + c * y + e;
    rectObj.points[3].y = b * x + d * y + f;
}

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