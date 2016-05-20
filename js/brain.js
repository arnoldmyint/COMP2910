/*

*/

function brain(context, positions){
	var startPoint = getStart();
	var brain=document.getElementById("brain");
	context.drawImage(brain, array_right[start].points[0].x+10, array_right[start].points[0].y+33);
	var inc = 0;
	var move = setInterval(rollBrain, 1);
	
	
	function rollBrain(){
		for(var i = 0; i < positions[startPoint.theLayer].length; i++){
			if(positions[1][i].index == 1){
				alert("Tile Exists");
			}
		}
		if(inc >= 33){
			clearInterval(move);
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		inc += 2;
		context.drawImage(brain, array_right[start].points[0].x+10-inc, array_right[start].points[0].y+33+inc);
		
	}
	
	function getStart(){		
		return { 	theLayer: parseInt(start%6),
					theTile: parseInt((35-start)/6)
		};
	}
	
	function rollSlope(){
		
	}
	
	function rollBox(){
		

	}
}