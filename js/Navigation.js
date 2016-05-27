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

