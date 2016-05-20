/*

*/

function brain(context, positions){
	var startingPoint = getStart();
	var brain=document.getElementById("brain");
	context.drawImage(brain, array_right[start].points[0].x+10, array_right[start].points[0].y+25);
	var inc = 0;
	var move = setInterval(rollBrain, 30);
	
	
	function rollBrain(){
		if(inc == 20){
			clearInterval(move);
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		inc++;
		context.drawImage(brain, array_right[start].points[0].x+10+inc, array_right[start].points[0].y+25);
		
	}
	
	function getStart(){		
		return { x: parseInt(start%6),
        y: parseInt((35-start)/6)
		};
	}
	
	function rollSlope(){
		
	}
	
	function rollBox(){
		

	}
}