function chooseLevel(whichLevel){
	 if(whichLevel == 0){
         //console.log(parseInt(Math.random()*29+1));
         levels = 0;
         do{
            end = parseInt(Math.random()*36);
            start = parseInt(Math.random()*36);   
         }while(start%6 == end);
     } else if(whichLevel == 1){
         levels = 1;
         end = 8;
         start = 26;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 2){
         levels = 2;
		 end = 20;
		 start = 20;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 3){
         levels = 3;
		 end = 18;
		 start = 14;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 4){
         levels = 4;
		 end = 1;
		 start = 26;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 5){
         levels = 5;
		 end = 3;
		 start = 8;
         numberOfBoxes = 100;
         numberOfDirections = 100;
         numberOfSlopes = 100;
	 } else if(whichLevel == 6){
         levels = 6;
		 end = 17;
		 start = 27;
		 crevices = [16];
         numberOfBoxes = 0;
         numberOfDirections = 2;
         numberOfSlopes = 1;
	 } else if(whichLevel == 7){
         levels = 7;
		 end = 13;
		 start = 24;
		 crevices = [6];
         numberOfBoxes = 1;
         numberOfDirections = 2;
         numberOfSlopes = 1;
	 } else if(whichLevel == 8){
         levels = 8;
		 end = 11;
		 start = 18;
		 crevices = [6,7,8,9,10];
         numberOfBoxes = 3;
         numberOfDirections = 2;
         numberOfSlopes = 2;
	 } else if(whichLevel == 9){
         levels = 9;
		 end = 18;
		 start = 19;
		 crevices = [6,7,8,9];
         numberOfBoxes = 3;
         numberOfDirections = 3;
         numberOfSlopes = 2;
	 } else if(whichLevel == 10){
         levels = 10;
		 end = 5;
		 start = 0;
		 crevices = [4, 10, 16, 22, 28];
         numberOfBoxes = 10;
         numberOfDirections = 2;
         numberOfSlopes = 5;
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