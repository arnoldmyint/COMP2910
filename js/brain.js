/**
 *	brain.js
 *
 *	Controls the brain drawing and movement
 *
 */

/**
 *	brain
 *	@context
 *	@positions array of shape objects
 *	
 *	Initializing of brain, all functions for movement contained.
 */
function brain(context, positions){
	var startPoint = getStart();
	var brain=document.getElementById("brain");
	var theX = array_right[start].points[0].x+10;
	var theY = array_right[start].points[0].y+33;
	context.drawImage(brain, theX, theY);
	var theLayer = 1;
	var theTile = 1;
	var incX = 0;
	var incY = 0;
	var move;
	var winner = 0;
	
	rollBrain();
	
	/**
	 *	rollBrain
	 *
	 *	determines location, decides how to roll based on next block as well as win or lose.
	 */
	function rollBrain(){
		var canMove = 0;
		//When brain is above the ground
		if(theLayer != -1){
			for(var i = 0; i < positions[theLayer].length; i++){
				if(positions[theLayer][i].index == theTile){
					if(positions[theLayer][i].type == "slope_SW"){
						move = setInterval(rollSlope, 10);
						canMove = 1;
						break;
					} else if(positions[theLayer][i].type == "box"){
						move = setInterval(rollBox, 10);
						canMove = 1;
						break;					
					} else {
						alert("You are a loser!");
						canMove = 0;
						context.clearRect(0, 0, canvas.width, canvas.height);
					}
				}
				canMove = 0;
			}
		} else {
			if(polygonClicked(4, rollx = [array_floor[end].points[0].x,array_floor[end].points[1].x,array_floor[end].points[2].x, array_floor[end].points[3].x],
				rolly = [array_floor[end].points[0].y,array_floor[end].points[1].y,array_floor[end].points[2].y, array_floor[end].points[3].y], theX, theY+5) == true){
				theScore -= time;
				clearInterval(move);
				winner = 1;
				alert("You Win!");
				context.clearRect(0, 0, canvas.width, canvas.height);
				document.location.href="http://comp2910.azurewebsites.net/form.html?score=" + theScore;
                //document.getElementById('mobilenumber').value=theScore;
			}
			canMove = 1;
			if(winner != 1){
				move = setInterval(rollGround, 10);
			}
		}			
		
		if(canMove == 0){
			alert("You Lose")
			context.clearRect(0, 0, canvas.width, canvas.height);
			document.location.href="http://comp2910.azurewebsites.net/";
		}
	}
	
	/**
	 *	getStart
	 *	
	 *	@return starting x and y of brain.
	 */
	function getStart(){		
		return { 	theLayer: parseInt(start%6),
					theTile: parseInt((35-start)/6)
		};
	}
	
	/**
	 *	rollSlope
	 *
	 *	Rolls the brain down the slope.
	 */
	function rollSlope(){
		if(incX >= 54){
			clearInterval(move);
			theX -= incX;
			theY += incY;
			theTile += 6;
			theLayer -= 1;
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
	
	/**
	 *	rollBox
	 *
	 *	Rolls the brain across the box.
	 */
	function rollBox(){
		if(incX >= 50){
			clearInterval(move);
			theX -= incX;
			theY += incY;
			theTile += 6;
			incX = 0;
			incY = 0;
			rollBrain();
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		incX += 2.75;
		incY += 2;
		context.drawImage(brain, theX-incX, theY+incY);
	}
	
	/**
	 *	rollGround
	 *
	 *	Rolls across the ground.
	 */
	function rollGround(){
		if(incX >= 44){
			clearInterval(move);
			theX -= incX;
			theY += incY;
			theTile += 6;
			incX = 0;
			incY = 0;
			rollBrain();
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		redraw(context);
        control_frame(context);
        addAllShapes(context, positions);
		incX += 3;
		incY += 2;
		context.drawImage(brain, theX-incX, theY+incX);
	}
}