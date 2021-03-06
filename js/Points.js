/**
 *	Points.js
 *	
 *	Calculations of clicking, points and polygon shapes.
 */

 /**
 *	shapePoints
 *	@index index of tile on layerX
 *	@shapeLayer layer on the grid
 *	@return point for drawing shape based on where it is on grid.
 *	
 */
function shapePoints(index,shapeLayer){
	var theX;
    var theY;
    var thePos;
	thePos = index%6;

	if(index < 6){
		theX = 345 + (thePos*array_floor[index].width);
		theY = 367 + (thePos*(array_floor[index].height*0.5)) - (shapeLayer * 55);
	} else if(index < 12 && index > 5){
		theX = (345 - (array_floor[index].width)) + (thePos*array_floor[index].width);
		theY = (367 + (array_floor[index].height*0.5)) + (thePos*(array_floor[index].height * 0.5)) - (shapeLayer * 55);
	} else if(index < 18 && index > 11){
		theX = (345 - (array_floor[index].width*2)) + (thePos*array_floor[index].width);
		theY = (367 + (array_floor[index].height*1)) + (thePos*(array_floor[index].height * 0.5)) - (shapeLayer * 55);
	} else if(index < 24 && index > 17){
		theX = (345 - (array_floor[index].width*3)) + (thePos*array_floor[index].width);
		theY = (367 + (array_floor[index].height*1.5)) + (thePos*(array_floor[index].height * 0.5)) - (shapeLayer * 55);
	} else if(index < 30 && index > 23){
		theX = (345 - (array_floor[index].width*4)) + (thePos*array_floor[index].width);
		theY = (367 + (array_floor[index].height*2)) + (thePos*(array_floor[index].height * 0.5)) - (shapeLayer * 55);
	} else if (index < 36 && index > 29){
		theX = (345 - (array_floor[index].width*5)) + (thePos*array_floor[index].width);
		theY = (367 + (array_floor[index].height*2.5)) + (thePos*(array_floor[index].height * 0.5)) - (shapeLayer * 50);
	}

	return { 	x: theX,
				y: theY
    };
}

/**
 *	getPointOnCanvas
 *	@canvas
 *	@x value on canvas
 *	@y value on canvas
 *	@return x and y value based on canvas.
 *
 *
 */
function getPointOnCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: (x - bbox.left) * (canvas.width  / bbox.width),
        y: (y - bbox.top)  * (canvas.height / bbox.height)
    };
}

/**
 *	getPoints
 *	@rectObj the rect to find transformation
 *	@a matrix transform information from setTransform(x,x,x,x,x,x)
 *	@b matrix transform information from setTransform(x,x,x,x,x,x)
 *	@c matrix transform information from setTransform(x,x,x,x,x,x)
 *	@d matrix transform information from setTransform(x,x,x,x,x,x)
 *	@e matrix transform information from setTransform(x,x,x,x,x,x)
 *	@f matrix transform information from setTransform(x,x,x,x,x,x)
 *
 *	Updates points of transformed tile.
 *
 */
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

/**
 *	polygonClicked
 *	
 *	@numVertices Number of vertices in the polygon
 *	@xVertices Array of X vertices of the polygon
 *	@yVertices Array of Y vertices of the polygon
 *	@xClicked x coordinate that has been clicked
 *	@yClicked y coordinate that has been clicked
 *	@return boolean
 *
 *	Checks if a polygon is clicked, if so returns true. Works for all polygons, we use on triangles and rhombus's.
 */
function polygonClicked(numVertices, xVertices, yVertices, xClicked, yClicked){
    var i;
	var j
	var clicked = false;
    for( i = 0, j = numVertices-1; i < numVertices; j = i++ ) {
        if( ( ( yVertices[i] > yClicked ) != ( yVertices[j] > yClicked ) ) &&
            ( xClicked < ( xVertices[j] - xVertices[i] ) * ( yClicked - yVertices[i] ) / ( yVertices[j] - yVertices[i] ) + xVertices[i] ) ) {
                clicked = !clicked;
        }
    }
    return clicked;
}