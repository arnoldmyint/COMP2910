$(document).ready(function(){
    
    $(".play").click(function(){
        $("#landingPage").slideToggle();
        $("#chooseGame").slideToggle();
    });

    $(".loadlevel").click(function(){
        $("#chooseGame").slideToggle();
        $("#loadLevel").slideToggle();
    });
	
    $(".level1").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(1);
    });
	
    $(".level2").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(2);
    });    
    
    $("#loadLevel .return").click(function(){
        $("#loadLevel").slideToggle();
        $("#chooseGame").slideToggle();
    });
    
    $(".challenge").click(function(){
        $("#chooseGame").slideToggle();
        $("#mycanvas").slideToggle();
        $("#time").show();
        load(0);
    });    
    
    $("#chooseGame .return").click(function(){
        $("#chooseGame").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    $('.highscores').click(function() {
        window.location.href="/board.php";
    });
    
    $(".tutorial").click(function(){
        $("#landingPage").slideToggle();
        $("#tutorial").slideToggle();
    });

    $("#tutorial .return").click(function(){
        $("#tutorial").slideToggle();        
        $("#landingPage").slideToggle();
    });
  
    $(".credits").click(function(){
        $("#landingPage").slideToggle();
        $("#credits").slideToggle();
    });
    
    $("#credits .return").click(function(){
        $("#credits").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    $(".resume").click(function(){
        $("#pauseGame").slideToggle();
        $("#mycanvas").slideToggle();   
        $("#time").show();
        timer(context);
    });
    
    $("#pauseGame .menu").click(function(){
        $("#pauseGame").slideToggle();
        $("#confirmationPage").slideToggle();  
    });

    $("#confirmationPage .yes").click(function(){
        $("#confirmationPage").slideToggle();
        $("#landingPage").slideToggle();  
    });

    $("#confirmationPage .no").click(function(){
        $("#confirmationPage").slideToggle();
        $("#pauseGame").slideToggle();  
    });
    
    $("#gameOver .menu").click(function(){
        $("#gameOver").slideToggle();
        $("#landingPage").slideToggle();  
    });
    
    $("#gameWin .menu").click(function(){
        $("#gameWin").slideToggle();
        $("#landingPage").slideToggle();  
    });
    
});

