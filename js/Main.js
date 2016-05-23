/**
 * Main.js
 * 
 * Holds all global variables, and contains the function to start
 * the game.
 */
 

var c=0;

/*	egg
 *	location
 */
var egg;

/*	start
 *	starting point
 */
var start;

/*	end
 *	ending point information
 */
var end;
 
/*	moving
 *	boolean cursor moving
 */
var moving = false;

/*	array_floor
 *	array of floor tiles.
 */
var array_floor = [];

/*	array_left
 *	array of left wall tiles.
 */
var array_left = [];

/*	array_right
 *	array of right wall tiles
 */
var array_right = [];

/*	mouseUp
 *	boolean mouse released
 */
var mouseUp = false;

/*	theScore
 *	Player score variable
 */
var theScore = 0;

/*	time
 *	time increment
 */
var time = 200;

/**
 *	load
 *	
 *	Initiliazing of game.
 *	
 */
function load(){


    canvas=document.getElementById("mycanvas");
    container=document.getElementById("container");
    var context=canvas.getContext("2d");
    createObj();
    if(device.desktop() || device.tablet()){
        canvas.style.width="400px";
        canvas.style.height="800px";
        //canvas.style.width=(document.body.clientHeight*window.devicePixelRatio)/2+"px";
        //canvas.style.height=document.body.clientHeight*window.devicePixelRatio+"px";
        //container.style.backgroundColor="antiquewhite";

    }else if (device.mobile()){
        canvas.style.width = window.innerWidth*window.devicePixelRatio;
        canvas.style.height = window.innerHeight*window.devicePixelRatio;
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
    timer(context);
    context.save();
    context.fillStyle="green";
    context.fillRect(0,0,800,10);

	
	

    //var myVar = setInterval(function(){floor(arr,context),right_wall(arr,context)}, 100);
}