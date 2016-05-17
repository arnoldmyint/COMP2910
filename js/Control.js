/**
 * Created by siyuanwang on 2016-05-17.
 */
function control(context) {
    context.save();
    var positions = [];
    var position = -1;
    frame=document.getElementById("control_panel");
    eraser=document.getElementById("eraser");
    roll=document.getElementById("roll");
    box=document.getElementById("box");
    if(device.mobile()){
        draw_phone(context);
    }else if(device.desktop() || device.tablet()){
        draw_desktop(context);
    }
    function draw_phone(context) {
        context.drawImage(frame,8,850,789,295);
        context.drawImage(eraser,7,630,400,210);
        context.drawImage(roll,395,630,400,210);
        context.drawImage(box,136,900);
    }
    function draw_desktop(context) {
        context.drawImage(frame,8,850,789,295);
        context.drawImage(eraser,7,630,400,210);
        context.drawImage(roll,395,630,400,210);
        context.drawImage(box,0,0);
    }
    function move (e) {
        e.preventDefault();
        moving = true;
        context.clearRect(0,0,canvas.width,canvas.height);
        var point = getPointOnCanvas(canvas, e.pageX, e.pageY);
        redraw(context);
        if(device.mobile()){
            draw_phone(context);
        } else if(device.desktop() || device.tablet()){
            draw_desktop(context);
        }
        addBox(context,positions);
        for(var i=0; i< array_floor.length; i++){
            if (point.x >= array_floor[i].points[3].x-80 && point.x <= array_floor[i].points[1].x-80 && point.y >= array_floor[i].points[0].y-90 && point.y <= array_floor[i].points[2].y-90){
                position = 0;
                context.setTransform(1,0.5,-1,0.5,455,395);
                context.fillStyle="black";
                context.fillRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
                context.restore();
                position = i;
                break;
            } else {
                position = -1;
            }
        }
        // Check if position is already in the array
        for(i = 0; i < positions.length;i++){
            if(positions[i] == position){
                position = -1;
                break;
            }
        }
        context.drawImage(box,point.x,point.y);
    }

    function up (e) {
        e.preventDefault();
        moving = false;
        mouseUp = true;
        context.clearRect(0,0,canvas.width,canvas.height);
        redraw(context);
        if(position != -1){
            positions.push(position);
        }
        addBox(context,positions);
        if(device.mobile()){
            draw_phone(context);
            canvas.removeEventListener("touchmove",move,false);
            canvas.removeEventListener("touchend", up, false);
        } else if(device.desktop()){
            draw_desktop(context);
            canvas.removeEventListener("mousemove",move,false);
            canvas.removeEventListener("mouseup", up, false);
        } else if(device.tablet()){
            draw_desktop(context);
            canvas.removeEventListener("touchmove",move,false);
            canvas.removeEventListener("touchend", up, false);
        }
    }
    if(device.desktop()){
        canvas.addEventListener("mousedown", function (e) {
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
            var x = point.x;
            var y = point.y;
            //click box
            if(x > 0 && y > 0 && x < 87 && y < 87) {
                canvas.addEventListener("mousemove", move, false);
                canvas.addEventListener("mouseup", up, false);
            }
        }, false);
    }
    if(device.mobile()){
        canvas.addEventListener("touchstart", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
            var x = point.x;
            var y = point.y;
            //click box
            if(x > 135 && y > 900 && x < 218 && y < 987) {
                canvas.addEventListener("touchmove", move, false);
                canvas.addEventListener("touchend", up, false);
            }
        }, false);
    }
    if(device.tablet()){
        canvas.addEventListener("touchstart", function (e) {
            e.preventDefault();
            moving = false;
            mouseUp = false;
            var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
            var x = point.x;
            var y = point.y;
            //click box
            if(x > 0 && y > 0 && x < 87 && y < 87) {
                canvas.addEventListener("touchmove", move, false);;
                canvas.addEventListener("touchend", up, false);
            }
        }, false);
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