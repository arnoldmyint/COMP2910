/*

*/

function brain(context, positions){
	var startPoint = getStart();
	var brain=document.getElementById("brain");
	var theX = array_right[start].points[0].x+10;
	var theY = array_right[start].points[0].y+33;
	context.drawImage(brain, theX, theY);
	var theLayer = 1;
	var theTile = 1;
	var inc = 0;
	var incX = 0;
	var incY = 0;
	var move;
	
	rollBrain();
	
	
	function rollBrain(){
			var canMove = 0;
			alert(theLayer);
			for(var i = 0; i < positions[theLayer].length; i++){
				if(positions[theLayer][i].index == theTile){
					if(positions[theLayer][i].type == "box"){
						move = setInterval(rollBox, 100);
						canMove = 1;
						break;
					} else if(positions[theLayer][i].type == "slope_SW"){
						move = setInterval(rollSlope, 100);
						canMove = 1;
						break;
					} else if(theLayer == 0){
						move = setInterval(rollGround, 100);
						canMove = 1;
						break;						
					} else {
						alert("You are a loser!");
						canMove = 0;
					}
				}
				canMove = 0;
			}
			if(canMove == 0){
				alert("You are a loser!")
			}
		
		/*
		if(inc >= 33){
			clearInterval(move);
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		inc += 2;
		context.drawImage(brain, array_right[start].points[0].x+10-inc, array_right[start].points[0].y+33+inc);
		*/		
	}
	
	function getStart(){		
		return { 	theLayer: parseInt(start%6),
					theTile: parseInt((35-start)/6)
		};
	}
	
	function rollSlope(){
		if(incX >= 54){
			clearInterval(move);
			theX -= incX;
			theY += incY;
			theTile += 6;
			if(theLayer > 0){
				theLayer -= 1;
			}
			incX = 0;
			incY = 0;
			rollBrain();
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		incX += 2;
		incY += 3;
		context.drawImage(brain, theX-incX, theY+incY);
	}
	
	function rollBox(){
		if(inc >= 36){
			clearInterval(move);
			theX -= inc;
			theY += inc;
			theTile += 6;
			inc = 0;
			rollBrain();
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		inc += 2;
		context.drawImage(brain, theX-inc, theY+inc);
	}
	
	function rollGround(){
		if(inc >= 33){
			clearInterval(move);
			theX -= inc;
			theY += inc;
			theTile += 6;
			inc = 0;
			rollBrain();
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		inc += 2;
		context.drawImage(brain, theX-inc, theY+inc);
	}
}