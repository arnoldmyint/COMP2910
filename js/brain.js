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
    var movement;
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
		console.log("moving");
		//console.log("Direction to move: " + direction + " Layer: " +theBrain.brainLayer + " index: " + theBrain.brainIndex);
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
			moveBrain(2);
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
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
	function rollNW(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 1;
				if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NW"){
					moveBrain(8);
				} else {
					moveBrain(1);
				}
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NW"){
				theBrain.brainIndex -= 1;
				theBrain.brainLayer -=1;
				moveBrain(5);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
	function rollSE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 1;
				moveBrain(2);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SE"){
				theBrain.brainIndex += 1;
				theBrain.brainLayer -=1;
				moveBrain(6);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
	function rollNE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 6;
				if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NE"){
					moveBrain(9);
				} else {
					moveBrain(3);
				}
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NE"){
				theBrain.brainIndex -= 6;
				theBrain.brainLayer -=1;
				moveBrain(7);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
	function moveBrain(direction){
		var moveInc;
		var imgInc;
		//Counter Clockwise SW,NW
		//Clockwise SE, NE
		if(direction == 0 || direction == 1 || direction == 4 || direction == 5 || direction == 8){
			moveInc = 0;
			imgInc = 0;
		} else {
			moveInc = 23;
			imgInc = 23;
		}
		var brainPoint = directionXY(direction);        
		
        movement = setInterval(function (){    
            //console.log(imgInc);
            removeAllEvent();
			if(easterActivated == true){
				brain.src = "images/egg/egg" + imgInc + ".png";
			} else {
				brain.src = "images/brain/" + imgInc + ".png";
			}
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
			context.drawImage(brain,theBrain.x += brainPoint.x,theBrain.y += brainPoint.y, 30, 30);
			if(direction == 0 || direction == 1 || direction == 4 || direction == 5 || direction == 8){
				if(moveInc == 23){
					clearInterval(movement);
					if(checkLoss() == true){
						lose();
					} else {
						whereTo();
					}
				}
				moveInc++;
				imgInc++;
				if(imgInc  == 23){
					imgInc = 0;
				}
			} else {
				if(moveInc == 0){
					clearInterval(movement);
					if(checkLoss() == true){
						lose();
					} else {
						whereTo();
					}
				}
				moveInc--;
				imgInc--;
				if(imgInc  == 0){
					imgInc = 23;
				}
			}
		}, 25);
    }
	
	function checkLoss(){
		if (array_floor[theBrain.brainIndex].crevice == true){
			return true;
		}
		
		if(direction == "direction_SW"){
			if(theBrain.brainIndex > 35){
				return true;
			}
		} else if (direction == "direction_NW"){
			if(theBrain.brainIndex < 0 || theBrain.brainIndex % 6 == 5){
				return true;
			}
		} else if (direction == "direction_SE"){
			if(theBrain.brainIndex % 6 == 0){
				return true;
			}
		} else if (direction == "direction_NE"){
			if(theBrain.brainIndex < 0){
				return true;
			}
		}
		
		return false;
	}
	
	function directionXY(direction){
		var theX;
		var theY;
		if(direction == 0){
			//FLAT SW
			theX = -2.25;
			theY = 1.166666666;
		}else if (direction == 1){
			//FLAT NW
			theX = -2.25;
			theY = -1.166666666;
		} else if (direction == 2){
			//FLAT SE
			theX = 2.25;
			theY = 1.166666666;
		} else if (direction == 3){
			//FLAT NE
			theX = 2.25;
			theY = -1.166666666;
		} else if (direction == 4){
			//SLOPE SW
			theX = -2.2916666666;
			theY = 3.2083333333;
		} else if (direction == 5){
			//SLOPE NW
			theX = -2.2916666666;
			theY = 1.10;
		} else if (direction == 6){
			//SLOPE SE
			theX = 2.2916666666;
			theY = 3.2083333333;
		} else if (direction == 7){
			//SLOPE NE
			theX = 2.2916666666;
			theY = 1;
		} else if (direction == 8){
			//SPECIAL CASE: NW next shape slope
			theX = -1.78125;
			theY = -0.9236111105833333;
		} else if (direction == 9){
			//SPECIAL CASE: NE next shape slope
			theX = 1.125;
			theY = -0.583333333;
		}
		
		return { 	x: theX,
					y: theY
		};
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
        clearInterval(movement);
        var i = 0;
        var explosion= setInterval(function (){
            brain.src = "images/EXPLOSION/e" + i + ".png";
            console.log(brain);
            context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
            context.drawImage(brain, theBrain.x, theBrain.y, 30, 30);
            i++;
            if(i==19){
                i = 0;
            }
        },100);
        setTimeout(function (){
            clearInterval(explosion);
            $("#mycanvas").hide();
            $("#time").hide();
            $("#gameOver").show();
            printLoseScore(); 
        },2000);
	}
	
	function win(){
        achieve_1++;
        clearInterval(movement);
        theScore += (time/4) * 10;
        console.log(theScore);
        if(levels == 0){
            var height = parseInt((35-start) / 6);
            var far = parseInt(end/6);
            if(height == 0){
                height = 1;
            }
            console.log(height);
            theScore += height*(time/4)/10;
            console.log(theScore);
            if(far < height){
                theScore += (height - far)*(time/4)/10;
            }else {
                theScore = theScore;
            }
            console.log(theScore);
            for(i = 0; i < positions.length; i++){
                for(j = 0; j < positions[i].length; j++){
                    if(positions[i][j].used == true){
                        switch(positions[i][j].shapeName){
                            case "box":
                                theScore -= 5;
                                break;
                            case "slope":
                                theScore -= 10;
                                break;
                            case "direction":
                                theScore -= 15;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            console.log(theScore);
        }
        $("#mycanvas").hide();
        $("#time").hide();
        $("#gameWin").show();
        $("#achieve_1").hide();
        printWinScore();
        if(achieve_1 == 10 && levels == 0){
            $("#achieve_1").show();
            document.location.href="/form2.html?score=" + theScore + "&achievement=" + "&#127775";
        }
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
    if(levels == 0){
        document.location.href="/form2.html?score=" + theScore;
    }else {
        document.location.href="/form.html?score=" + theScore;   
    }
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
