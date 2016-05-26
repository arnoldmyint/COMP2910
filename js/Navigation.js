$(document).ready(function(){
    
    $(".playbutton").click(function(){
        $("#landingPage").slideToggle();
        $("#chooseGame").slideToggle();
    });

    $(".loadlevelbutton").click(function(){
        $("#chooseGame").slideToggle();
        $("#loadLevel").slideToggle();
    });
	
    $("#level1").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(1);
    });
	
    $("#level2").click(function(){
        $("#loadLevel").slideToggle();
		$("#mycanvas").slideToggle();
        $("#time").show();
        load(2);
    });    
    
    $(".loadlevelreturnbutton").click(function(){
        $("#loadLevel").slideToggle();
        $("#chooseGame").slideToggle();
    });
    
    $(".challengebutton").click(function(){
        $("#chooseGame").slideToggle();
        $("#mycanvas").slideToggle();
        $("#time").show();
        load(0);
    });    
    
    $(".choosegamereturnbutton").click(function(){
        $("#chooseGame").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    $('.highscoresbutton').click(function() {
        window.location.href="http://comp2910.azurewebsites.net/scoreboard.php";
    });
    
    $(".tutorialbutton").click(function(){
        $("#landingPage").slideToggle();
        $("#tutorial").slideToggle();
    });

    $(".tutorialreturnbutton").click(function(){
        $("#tutorial").slideToggle();        
        $("#landingPage").slideToggle();
    });
  
    $(".creditsbutton").click(function(){
        $("#landingPage").slideToggle();
        $("#credits").slideToggle();
    });
    
    $(".creditsreturnbutton").click(function(){
        $("#credits").slideToggle();        
        $("#landingPage").slideToggle();
    });
    
    $(".resumebutton").click(function(){
        $("#pauseGame").slideToggle();
        $("#mycanvas").slideToggle();   
        $("#time").show();
        timer(context);
    });
    
    $(".menubutton").click(function(){
        $("#pauseGame").slideToggle();
        $("#landingPage").slideToggle();  
    });
    
});

