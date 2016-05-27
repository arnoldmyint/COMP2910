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
	 } else if(whichLevel == 11){
         levels = 11;
		 end = 29;
		 start = 24;
		 crevices = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28];
         numberOfBoxes = 0;
         numberOfDirections = 2;
         numberOfSlopes = 1;
	 } else if(whichLevel == 12){
         levels = 12;
		 end = 5;
		 start = 18;
		 crevices = [4, 8, 10, 14, 16, 20, 22, 26, 28, 32];
         numberOfBoxes = 3;
         numberOfDirections = 4;
         numberOfSlopes = 2;
	 } else if(whichLevel == 13){
         levels = 13;
		 end = 5;
		 start = 24;
		 crevices = [2, 6, 8, 12, 14, 18, 20, 24, 26, 30];
         numberOfBoxes = 2;
         numberOfDirections = 4;
         numberOfSlopes = 1;
	 } else if(whichLevel == 14){
         levels = 18;
		 end = 5;
		 start = 0;
		 crevices = [2, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34];
         numberOfBoxes = 5;
         numberOfDirections = 5;
         numberOfSlopes = 2;
	 } else if(whichLevel == 15){
         levels = 15;
		 end = 12;
		 start = 24;
		 crevices = [2, 6, 9, 13, 16, 20, 23, 24, 27, 29, 31, 35];
         numberOfBoxes = 8;
         numberOfDirections =14;
         numberOfSlopes = 1;
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