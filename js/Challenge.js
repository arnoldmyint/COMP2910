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
    //context.setTransform(1,0.5,0,1,400,38);
    //var i = parseInt(36 * Math.random());
    var i = 35;
    if(device.mobile() || device.tablet()){
        var point = getPointOnCanvas(canvas, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
    }else{
        var point = getPointOnCanvas(canvas,e.pageX,e.pageY);
    }
    if (point.x >= array_left[i].points[3].x && point.x <= array_left[i].points[1].x && point.y >= array_left[i].points[0].y && point.y <= array_left[i].points[2].y && !mouseUp && !moving){
        console.log(1);
        $(canvas).unbind("click touchstart", easter);
    }
}