/**
 * Created by siyuanwang on 2016-05-17.
 */
var c=0;
var egg;
var moving = false;
var array_floor = [];
var array_left = [];
var array_right = [];
var mouseUp = false;
function load(){
    canvas=document.getElementById("mycanvas");
    container=document.getElementById("container");
    var context=canvas.getContext("2d");
    createObj();
    if(canvas.width < window.innerWidth){
        canvas.style.width="600px";
        canvas.style.height="1200px";
        container.style.backgroundColor="antiquewhite";

    }else {
        canvas.style.width = window.innerWidth*window.devicePixelRatio;
        canvas.style.height = window.innerWidth*window.devicePixelRatio;
    }
//            window.addEventListener("resize", resizeCanvas, false);
//            function resizeCanvas() {
//                if(canvas.width < window.innerWidth){
//                    canvas.style.width="600px";
//                    canvas.style.height="1200px";
//                    container.style.backgroundColor="antiquewhite";
//                } else {
//                    canvas.style.width = window.innerWidth*window.devicePixelRatio;
//                    canvas.style.height = window.innerWidth*window.devicePixelRatio;
//                }
//                floor(arr,context);
//                right_wall(arr,context);
//                left_wall(arr,context);
//                frame_horizontal(context);
//                frame_vertical(context);
//                //addBox(arr,context);
//            }
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
    control(context);
    context.save();

    //var myVar = setInterval(function(){floor(arr,context),right_wall(arr,context)}, 100);
}