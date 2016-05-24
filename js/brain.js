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
	theBrain.x = array_right[start].points[3].x;
	theBrain.y = array_right[start].points[3].y;
	
	var direction = "direction_SW";
	
	startBrainRoll();
	
	function startBrainRoll(){
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0,0,canvas.width,canvas.height);
		redraw(context);
		addAllShapes(context, positions);
		control_frame(context);
		context.drawImage(brain,theBrain.x,theBrain.y, 30, 30);
		whereTo();
	}
	
	function whereTo(){
		//Find out direction
		if(positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_SW"
				|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_NW"
					|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_SE"
						|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_NE"){
			direction = positions[theBrain.brainLayer][theBrain.brainIndex].type;
		}
		
		if(theBrain.brainLayer == 0 && theBrain.brainIndex == end){
			win();
		} else if(theBrain.brainLayer == 0){
			if(isBlocked() == true){
				lose();
			} else {
				rollGround();
			}
		} else if (direction == "direction_SW"){
			if(isBlocked() == true){
				lose();
			} else {
				rollSW();
			}
		} else if (direction == "direction_NW"){
			if(isBlocked() == true){
				lose();
			} else {
				rollNW();
			}
		} else if (direction == "direction_SE"){
			if(isBlocked() == true){
				lose();
			} else {
				rollSE();
			}
		} else if (direction == "direction_NE"){
			if(isBlocked() == true){
				lose();
			} else {
				rollNE();
			}
		}
	}
	
	function rollGround(){
		if(direction == "direction_SW"){
			theBrain.brainIndex += 6;
			moveBrain(0);
		} else if (direction == "direction_NW"){
			theBrain.brainIndex -= 1;
			moveBrain(1);
		} else if (direction == "direction_SE"){
			theBrain.brainIndex += 1;
			moveBrain(2)
		} else if (direction == "direction_NE"){
			theBrain.brainIndex -= 6;
			moveBrain(3);
		}
	}
	
	function rollSW(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 6;
				moveBrain(0);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SW"){
				theBrain.brainIndex += 6;
				theBrain.brainLayer -=1;
				moveBrain(4);
			}
		} else {
			lose();
		}
	}
	
	function rollNW(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 1;
				moveBrain(1);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NW"){
				theBrain.brainIndex -= 1;
				theBrain.brainLayer -=1;
				moveBrain(5);
			}
		} else {
			lose();
		}
	}
	
	function rollSE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 1;
				moveBrain(2)
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SE"){
				theBrain.brainIndex += 1;
				theBrain.brainLayer -=1;
				moveBrain(6)
			}
		} else {
			lose();
		}
	}
	
	function rollNE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 6;
				moveBrain(3);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NE"){
				theBrain.brainIndex -= 6;
				theBrain.brainLayer -=1;
				moveBrain(7);
			}
		} else {
			lose();
		}
	}
	
	function moveBrain(direction){
		var moveInc = 0;
		var theX;
		var theY;
		if(direction == 0){
			//FLAT SW
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
		} else if (direction == 5){
			//SLOPE NW
			theX = 2.2916666666;
			theY = -3.2083333333;
		} else if (direction == 6){
			//SLOPE SE
			theX = 2.2916666666;
			theY = 3.2083333333;
		} else if (direction == 7){
			//SLOPE NE
			theX = 2.2916666666;
			theY = -3.2083333333;
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
		}, 50);
    }
	
	function isBlocked(){
		if(positions[theBrain.brainLayer][theBrain.brainIndex].used == true
			&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_SW"
				&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_NW"
					&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_SE"
						&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_NE"){
			return true;
		} else {
			return false;
		}
	}
	
	function lose(){
        $("#mycanvas").hide();
        $("#time").hide();
        $("#gameOver").show();
        printLoseScore();
	}
	
	function win(){
        theScore = (time/4) * 10;
        $("#mycanvas").hide();
        $("#time").hide();
        $("#gameWin").show();
        printWinScore();
	}
	
	function restart(){
		alert("DONT KNOW WHAT TO DO");		
	}
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

	/**
	 *	sendScore
	 *
	 *	Send the score.
	 */
function getScore(){
    document.location.href="http://comp2910.azurewebsites.net/form.html?score=" + theScore;
}


	/**
	 *	printLoseScore
	 *
	 *	Show score after losing the game.
	 */
function printLoseScore(){
        document.getElementById('loseScore').innerHTML = theScore;
}

	/**
	 *	printWinScore
	 *
	 *	Show score after winning the game.
	 */
function printWinScore(){
        document.getElementById('winScore').innerHTML = theScore;
}
