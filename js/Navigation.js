/*
    Navigation.js
    This functions are meant to move between pages in our Brain Roll game.
*/
$(document).ready(function(){
    
    /* Play button clicked, hide Menu page and show Choose game page.  */
    $(".play").click(function(){
        $("#landingPage").slideToggle();
        $("#chooseGame").slideToggle();
    });

    /* Load Level button clicked, hide Choose game page and show Load level page.  */
    $(".loadlevel").click(function(){
        $("#chooseGame").slideToggle();
        $("#loadLevel").slideToggle();
    });
	
    /* Level 1 button clicked, hide Load level page and show Canvas and start the level 1 game.  */
    $(".level1").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(1);
    });
	
    /* Level 2 button clicked, hide Load level page and show Canvas and start the level 2 game.  */
    $(".level2").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(2);
    });    
	
    /* Level 3 button clicked, hide Load level page and show Canvas and start the level 3 game.  */
    $(".level3").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(3);
    });    
	
    /* Level 4 button clicked, hide Load level page and show Canvas and start the level 4 game.  */
    $(".level4").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(4);
    });    
	
    /* Level 5 button clicked, hide Load level page and show Canvas and start the level 5 game.  */
    $(".level5").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(5);
    });    
	
    /* Level 6 button clicked, hide Load level page and show Canvas and start the level 6 game.  */
    $(".level6").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(6);
    });        
	
    /* Level 7 button clicked, hide Load level page and show Canvas and start the level 7 game.  */
    $(".level7").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(7);
    });        
	
    /* Level 8 button clicked, hide Load level page and show Canvas and start the level 8 game.  */
    $(".level8").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(8);
    });        
	
    /* Level 9 button clicked, hide Load level page and show Canvas and start the level 9 game.  */
    $(".level9").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(9);
    });        
	
    /* Level 10 button clicked, hide Load level page and show Canvas and start the level 10 game.  */
    $(".level10").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(10);
    });        
	
    /* Level 11 button clicked, hide Load level page and show Canvas and start the level 11 game.  */
    $(".level11").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(10);
    });            
	
    /* Level 12 button clicked, hide Load level page and show Canvas and start the level 12 game.  */
    $(".level12").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(12);
    });            
	
    /* Level 13 button clicked, hide Load level page and show Canvas and start the level 13 game.  */
    $(".level13").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(13);
    });            
	
    /* Level 14 button clicked, hide Load level page and show Canvas and start the level 14 game.  */
    $(".level14").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(14);
    });            
	
    /* Level 15 button clicked, hide Load level page and show Canvas and start the level 15 game.  */
    $(".level15").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(15);
    });
	
	
    /* Return button clicked, hide Load level page and show Choose game page.  */
    $("#loadLevel .return").click(function(){
        $("#loadLevel").slideToggle();
        $("#chooseGame").slideToggle();
    });
    
    /* Challenge button clicked, hide Choose game page and show Canvas and start the Challenge game.  */
    $(".challenge").click(function(){
        $("#chooseGame").slideToggle();
        $("#mycanvas").slideToggle();
        $("#time").show();
        load(0);
    });    
    
    /* Return button clicked, hide Choose game page and show Menu page.  */
    $("#chooseGame .return").click(function(){
        $("#chooseGame").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    /* Highscores button clicked, load board.php.  */
    $('.highscores').click(function() {
        window.location.href="/board.php";
    });
    
    /* Tutorial button clicked, hide Menu page and show Tutorial page.  */
    $(".tutorial").click(function(){
        $("#landingPage").slideToggle();
        $("#tutorial").slideToggle();
    });

    /* Return button clicked, hide Tutorial page and show Menu page.  */
    $("#tutorial .return").click(function(){
        $("#tutorial").slideToggle();        
        $("#landingPage").slideToggle();
    });

    /* Credits button clicked, hide Menu page and show Credits page.  */
    $(".credits").click(function(){
        $("#landingPage").slideToggle();
        $("#credits").slideToggle();
    });
    
    /* Return button clicked, hide Credits page and show Menu page.  */
    $("#credits .return").click(function(){
        $("#credits").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    /* Resume button clicked, hide Pause page, show Canvas and timer.  */
    $(".resume").click(function(){
        $("#pauseGame").slideToggle();
        $("#mycanvas").slideToggle();   
        $("#time").show();
        timer(context);
    });
    
    /* Menu button clicked, hide Pause page and show confirmation page.  */
    $("#pauseGame .menu").click(function(){
        $("#pauseGame").slideToggle();
        $("#confirmationPage").slideToggle();  
    });

    /* Yes button clicked, hide Confirmation page and show Menu page.  */
    $("#confirmationPage .yes").click(function(){
        $("#confirmationPage").slideToggle();
        $("#landingPage").slideToggle();  
    });

    /* No button clicked, hide Confirmation page and show Pause page.  */
    $("#confirmationPage .no").click(function(){
        $("#confirmationPage").slideToggle();
        $("#pauseGame").slideToggle();  
    });
    
    /* Menu button clicked, hide Game over page and show Menu page.  */
    $("#gameOver .menu").click(function(){
        $("#gameOver").slideToggle();
        $("#landingPage").slideToggle();  
    });
    
    /* Menu button clicked, hide Win page and show Menu page.  */
    $("#gameWin .menu").click(function(){
        $("#gameWin").slideToggle();
        $("#landingPage").slideToggle();  
    });
    
});

