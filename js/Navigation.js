$(document).ready(function(){
    
    $(".playbutton").click(function(){
        $("#landingPage").toggle();
        $("#chooseGame").toggle();
    });

    $(".loadlevelbutton").click(function(){
        $("#chooseGame").toggle();
        $("#loadLevel").toggle();
    });
    
    $(".loadlevelreturnbutton").click(function(){
        $("#loadLevel").toggle();        
        $("#chooseGame").toggle();
    });
    
    $(".challengebutton").click(function(){
        $("#chooseGame").toggle();
        $("#mycanvas").toggle();
        load();
        
    });    
    
    $(".choosegamereturnbutton").click(function(){
        $("#chooseGame").toggle();        
        $("#landingPage").toggle();
    });
    
    $('.highscoresbutton').click(function() {
        window.location.href="http://comp2910.azurewebsites.net/scoreboard.php";
    });
    
    $(".tutorialbutton").click(function(){
        $("#landingPage").toggle();
        $("#tutorial").toggle();
    });

    $(".tutorialreturnbutton").click(function(){
        $("#tutorial").toggle();        
        $("#landingPage").toggle();
    });
  
    $(".creditsbutton").click(function(){
        $("#landingPage").toggle();
        $("#credits").toggle();
    });
    
    $(".creditsreturnbutton").click(function(){
        $("#credits").toggle();        
        $("#landingPage").toggle();
    });
});