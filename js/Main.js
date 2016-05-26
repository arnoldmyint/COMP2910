/**
 * Main.js
 * 
 * Holds all global variables, and contains the function to start
 * the game.
 */
 
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

/*
 number of slopes types
*/
var slope = 0;

/*
 number of direction types
*/
var direction = 0;

/*
 context of canvas
*/
var context;

/*
 timer of the time
*/
var mytimer;

/*
 1-15 levels and 0 for randomize level
*/
var levels;

/*
 retry for the randomize level
*/
var isRetry = false;

/*
 number of slopes for pre-set levels
*/
var numberOfSlopes = 0;

/*
 number of boxes for pre-set levels
*/
var numberOfBoxes = 0;

/*
 number of directions for pre-set levels
*/
var numberOfDirections = 0;
/**
 *	load
 *	
 *	Initiliazing of game.
 *	
 */
function load(whichLevel){
    if(!isRetry){
        chooseLevel(whichLevel);   
    }
    isRetry = false;
    canvas=document.getElementById("mycanvas");
    container=document.getElementById("container");
    context=canvas.getContext("2d");
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
    control(context);
    context.save();
    if(!moving && !mouseUp){
        $(canvas).on("click touchstart", function (e) {
            easter(e,context);
        });
    }
//    context.fillStyle="green";
//    context.fillRect(0,0,800,10);

	
	

    //var myVar = setInterval(function(){floor(arr,context),right_wall(arr,context)}, 100);
}
function removeAllEvent(){
    $(canvas).unbind('click');
    $(canvas).unbind('mousedown');
    $(canvas).unbind('mouseup');
    $(canvas).unbind('mousemove');
    $(canvas).unbind('touchstart');
    $(canvas).unbind('touchmove');
    $(canvas).unbind('touchend');
}