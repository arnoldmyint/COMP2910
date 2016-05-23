$(document).ready(function(){
    
    $(".playbutton").click(function(){
        $("#landingPage").slideToggle();
        $("#chooseGame").slideToggle();
    });

    $(".loadlevelbutton").click(function(){
        $("#chooseGame").slideToggle();
        $("#loadLevel").slideToggle();
    });
    
    $(".loadlevelreturnbutton").click(function(){
        $("#loadLevel").slideToggle();        
        $("#chooseGame").slideToggle();
    });
    
    $(".challengebutton").click(function(){
        $("#chooseGame").slideToggle();
        $("#mycanvas").slideToggle();
        $("#time").show();
        load();
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
});

