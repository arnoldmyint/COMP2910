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
	var theBrain ={
            x:0,y:0,brainLayer:0,brainIndex:0
        };
	theBrain.brainLayer = startPoint.theLayer;
	theBrain.brainIndex = startPoint.theIndex;
	theBrain.x = array_right[19].points[3].x;
	theBrain.y = array_right[19].points[3].y;
	
	startBrain();
	
	function startBrain(){
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0,0,canvas.width,canvas.height);
		redraw(context);
		addAllShapes(context, positions);
		control_frame(context);
		context.drawImage(brain,theBrain.x,theBrain.y, 30, 30);
		whereTo();
	}
	
	function whereTo(){
		if(theBrain.brainLayer == 0){
			alert("You are on the ground")
			moveBrain(0);				
		} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 6;
				moveBrain(0);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SW"){
				theBrain.brainIndex += 6;
				theBrain.brainLayer -= 1;
				moveBrain(4);
			}
		} else {
			alert("on ground");
			moveBrain(0);
		}
	}
	
	function moveBrain(direction){
		var moveInc = 0;
		var theX;
		var theY;
		if(direction == 0){
			//BOX SW
			theX = -2.25;
			theY = 1.166666666;
		}else if (direction == 1){
			//BOX NW
			theX = 2.25;
			theY = -1.166666666;
		} else if (direction == 2){
			//BOX SE
			theX = 2.25;
			theY = 1.166666666;
		} else if (direction == 3){
			//BOX NE
			theX = 2.25;
			theY = -1.166666666;
		} else if (direction == 4){
			//SLOPE SW
			theX = -2.2916666666;
			theY = 3.2083333333;
		}
        var movement = setInterval(function (){
			moveInc++;
			brain.src = "images/brain/" + moveInc + ".png";
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
			context.drawImage(brain,theBrain.x += theX,theBrain.y += theY, 30, 30);
			if(moveInc == 23){
				clearInterval(movement);
				whereTo();
			}
			//console.log(1);
		}, 100);
    }
	
	function lose(){
		
	}
	
	function win(){
		
	}
	
	function restart(){
		
	}
	   	
	/**
	 *	getStart
	 *	
	 *	@return starting x and y of brain.
	 */
	function getStart(){		
		return { 	theLayer: parseInt((35-start) / 6),
					theIndex: parseInt(start%6)
		};
	}
	
//	/**
//	 *	rollBrain
//	 *
//	 *	determines location, decides how to roll based on next block as well as win or lose.
//	 */
//	function rollBrain(){
//		var canMove = 0;
//		//When brain is above the ground
//		if(theLayer != -1){
//			for(var i = 0; i < positions[theLayer].length; i++){
//				if(positions[theLayer][i].index == theTile){
//					if(positions[theLayer][i].type == "slope_SW"){
//						move = setInterval(rollSlope, 10);
//						canMove = 1;
//						break;
//					} else if(positions[theLayer][i].type == "box"){
//						move = setInterval(rollBox, 10);
//						canMove = 1;
//						break;					
//					} else {
//						alert("You are a loser!");
//						canMove = 0;
//						context.clearRect(0, 0, canvas.width, canvas.height);
//					}
//				}
//				canMove = 0;
//			}
//		} else {
//			if(polygonClicked(4, rollx = [array_floor[end].points[0].x,array_floor[end].points[1].x,array_floor[end].points[2].x, array_floor[end].points[3].x],
//				rolly = [array_floor[end].points[0].y,array_floor[end].points[1].y,array_floor[end].points[2].y, array_floor[end].points[3].y], theX, theY+5) == true){
//				theScore = (time/4) * 10;
//				clearInterval(move);
//				winner = 1;
//				alert("You Win!");
//				context.clearRect(0, 0, canvas.width, canvas.height);
//				document.location.href="http://comp2910.azurewebsites.net/form.html?score=" + theScore;
//                //document.getElementById('mobilenumber').value=theScore;
//			}
//			canMove = 1;
//			if(winner != 1){
//				move = setInterval(rollGround, 10);
//			}
//		}			
//		
//		if(canMove == 0){
//			alert("You Lose")
//			context.clearRect(0, 0, canvas.width, canvas.height);
//			document.location.href="http://comp2910.azurewebsites.net/";
//		}
//	}
//	
//	/**
//	 *	rollSlope
//	 *
//	 *	Rolls the brain down the slope.
//	 */
//	function rollSlope(){
//		if(incX >= 54){
//			clearInterval(move);
//			theX -= incX;
//			theY += incY;
//			theTile += 6;
//			theLayer -= 1;
//			incX = 0;
//			incY = 0;
//			rollBrain();
//			return;
//		}
//		context.clearRect(0, 0, canvas.width, canvas.height);
//		redraw(context);
//        control_frame(context);
//        addAllShapes(context, positions);
//		incX += 2;
//		incY += 3;
//		context.drawImage(brain, theX-incX, theY+incY);
//	}
//	
//	/**
//	 *	rollBox
//	 *
//	 *	Rolls the brain across the box.
//	 */
//	function rollBox(){
//		if(incX >= 50){
//			clearInterval(move);
//			theX -= incX;
//			theY += incY;
//			theTile += 6;
//			incX = 0;
//			incY = 0;
//			rollBrain();
//			return;
//		}
//		context.clearRect(0, 0, canvas.width, canvas.height);
//		redraw(context);
//        control_frame(context);
//        addAllShapes(context, positions);
//		incX += 2.75;
//		incY += 2;
//		context.drawImage(brain, theX-incX, theY+incY);
//	}
//	
//	/**
//	 *	rollGround
//	 *
//	 *	Rolls across the ground.
//	 */
//	function rollGround(){
//		if(incX >= 44){
//			clearInterval(move);
//			theX -= incX;
//			theY += incY;
//			theTile += 6;
//			incX = 0;
//			incY = 0;
//			rollBrain();
//			return;
//		}
//		context.clearRect(0, 0, canvas.width, canvas.height);
//		redraw(context);
//        control_frame(context);
//        addAllShapes(context, positions);
//		incX += 3;
//		incY += 2;
//		context.drawImage(brain, theX-incX, theY+incX);
//	}
//}
}