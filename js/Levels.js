function chooseLevel(whichLevel){
	 if(whichLevel == 1){
         levels = 1;
         end = 25;
         start = 13;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 1100;
	 } else if(whichLevel == 2){
         levels = 2;
		 end = 3;
		 start = 26;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 0){
         //console.log(parseInt(Math.random()*29+1));
         levels = 0;
         do{
            end = parseInt(Math.random()*36);
            start = 30;//parseInt(Math.random()*36);   
         }while(start%6 == end);
     }
 }

function nextLevel(){
    clearInterval(mytimer);
    time = 200;
    removeAllEvent();
    if(levels > 0 && levels < 16){
        levels++;
        load(levels);
    }else if(levels == 0){
        load(0);
    }
    $("#gameWin").hide();
    $("#mycanvas").show();
    $("#time").show();
}