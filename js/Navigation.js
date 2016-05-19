function showMenu(){
    document.getElementById('landingPage').style = 'display :block';
}

function hideMenu(){
    document.getElementById('landingPage').style = 'display :none';
}

function showHighscores(){
    hideMenu();
    document.getElementById('highscores').style = 'display :block';
}

function hideHighscores(){
    document.getElementById('highscores').style = 'display :none';
}

function showTutorial(){
    hideMenu();
    document.getElementById('tutorial').style = 'display :block';
}

function hideTutorial(){
    document.getElementById('tutorial').style = 'display :none';
}

function showCredits(){
    hideMenu();
    document.getElementById('credits').style = 'display :block';
}

function hideCredits(){
    document.getElementById('credits').style = 'display :none';
}

function showCanvas(){
    hideMenu();
    document.getElementById('mycanvas').style = 'display :block';
}

function hideCanvas(){
    document.getElementById('mycanvas').style = 'display :none';
}

function showGameReturn(){
    document.getElementById('gameMenu').style = 'display :block';
}

function hideGameReturn(){
    document.getElementById('gameMenu').style = 'display :none';
}

function showChooseGame(){
    hideMenu();
    document.getElementById('chooseGame').style = 'display :block';
}

function hideChooseGame(){
    document.getElementById('chooseGame').style = 'display :none';
}


function returnToMenu(){
    hideChooseGame();
    hideGameReturn();
    hideHighscores();
    hideTutorial();
    hideCredits();
    hideCanvas();
    showMenu();
}